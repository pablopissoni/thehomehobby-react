const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const jwt = require("jsonwebtoken");
const dbConnection = require("../dbConfig");
const app = require("../server");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID,
  ClientId: process.env.COGNITO_CLIENT_ID,
};
const AWS = require("aws-sdk");

// Configura las credenciales de AWS
AWS.config.update({ region: "us-east-2" });

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

async function getToken(req, res) {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "No se proporcionó un token JWT en el encabezado de autorización",
    });
  }

  try {
    const params = {
      AccessToken: token,
    };
    const data = await cognitoIdentityServiceProvider.getUser(params).promise();
    res.status(200).json({ data });
  } catch (error) {
    res.status(401).json({
      error: "Error al verificar y decodificar el token JWT: " + error.message,
    });
  }
}

const registerUser = async (req, res) => {
  try {
    const { name, lastName, phone, email, password } = req.body;

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el número de rondas de hashing
    // Definir el valor predeterminado para el campo role
    const defaultRole = "user";
    const userId = uuidv4();

    // Insertar usuario en la base de datos MySQL con contraseña encriptada
    const userData = {
      id: userId, // Utilizar el nuevo ID
      name: name,
      lastName: lastName,
      phone: phone,
      email: email,
      password: hashedPassword,
      role: defaultRole, // Contraseña encriptada
    };

    // Continuar con la inserción en la base de datos MySQL
    dbConnection.query(
      "INSERT INTO users SET ?",
      userData,
      (error, dbResult) => {
        if (error) {
          console.error(
            "Error al insertar usuario en la base de datos:",
            error
          );

          let errorCode = 500; // Código de error predeterminado

          // Verificar el tipo de error específico
          if (error.code === "ER_DUP_ENTRY") {
            errorCode = 409; // Conflict
          }

          return res.status(errorCode).json({
            error: "Error al insertar usuario en la base de datos",
          });
        }
        console.log("Usuario insertado en la base de datos:", dbResult);

        // Realizar el registro en AWS Cognito
        const attributeList = [
          new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: "name",
            Value: name,
          }),
          new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: "family_name",
            Value: lastName,
          }),
          new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: "phone_number",
            Value: phone,
          }),
        ];

        userPool.signUp(email, password, attributeList, null, (err, result) => {
          if (err) {
            console.error("Error al registrar usuario en Cognito:", err);
            let errorCode = 500; // Código de error predeterminado

            // Verificar el tipo de error específico
            if (err.code === "UsernameExistsException") {
              errorCode = 409; // Conflict
            }

            return res.status(errorCode).json({ error: err.message });
          }
          const cognitoUser = result.user;

          if (result.userConfirmed) {
            const token = result.getIdToken().getJwtToken();
            console.log(
              "Usuario registrado exitosamente en Cognito:",
              cognitoUser.getUsername()
            );
            console.log("Token JWT:", token);
            return res.status(201).json({
              message:
                "Usuario registrado exitosamente en la base de datos y en AWS Cognito",
              token,
            });
          } else {
            return res.status(201).json({
              message:
                "Usuario registrado en AWS Cognito. Por favor, confirme su cuenta.",
            });
          }
        });
      }
    );
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    let errorCode = 500; // Código de error predeterminado

    // Verificar el tipo de error específico
    if (error.code === "BadRequestException") {
      errorCode = 400; // Bad Request
    }

    return res.status(errorCode).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticationData = {
      Username: email,
      Password: password,
    };

    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        console.log("Usuario autenticado en Cognito");
        const accessToken = session.getAccessToken().getJwtToken();

        // cognitoUser.

        return res.status(201).json({
          success: true,
          message: "Usuario autenticado correctamente",
          accessToken: accessToken,
          email: email,
        });
      },
      onFailure: (err) => {
        console.error("Error al autenticar usuario en Cognito:", err);
        if (err.code === "UserNotConfirmedException") {
          return res.status(203).json({
            success: false,
            error: "El usuario aún no ha confirmado su cuenta",
          });
        } else {
          return res.status(202).json({
            success: false,
            error: "Credenciales inválidas",
          });
        }
      },
    });
  } catch (error) {
    console.error("Error general en el login:", error);
    return res.status(404).json({
      success: false,
      error: "Error al autenticar usuario",
    });
  }
};

const resendConfirmationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        console.error(
          "Error al reenviar correo de confirmación en Cognito:",
          err
        );
        return res
          .status(400)
          .json({ error: "Error al reenviar correo de confirmación" });
      } else {
        console.log("Correo de confirmación reenviado:", result);
        return res
          .status(200)
          .json({ message: "Correo de confirmación reenviado exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al reenviar correo de confirmación:", error);
    return res
      .status(400)
      .json({ error: "Error al reenviar correo de confirmación" });
  }
};

const recoverAccount = async (req, res) => {
  try {
    const { email } = req.body;

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess: () => {
        console.log(
          "Se ha enviado un correo electrónico con el enlace para restablecer la contraseña"
        );
        return res.status(200).json({
          message:
            "Se ha enviado un correo electrónico con el enlace para restablecer la contraseña.",
        });
      },
      onFailure: (err) => {
        if (err.code === "UserNotFoundException") {
          return res.status(404).json({
            error:
              "El correo electrónico ingresado no se encuentra registrado.",
          });
        } else {
          console.error(
            "Error al solicitar el enlace de restablecimiento de contraseña:",
            err
          );
          return res.status(400).json({
            error:
              "Error al solicitar el enlace de restablecimiento de contraseña. Por favor, inténtalo de nuevo más tarde.",
          });
        }
      },
    });
  } catch (error) {
    console.error("Error al recuperar la cuenta:", error);
    return res.status(500).json({
      error:
        "Error al recuperar la cuenta. Por favor, inténtalo de nuevo más tarde.",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: () => {
        console.log("Contraseña cambiada exitosamente");
        return res
          .status(200)
          .json({ message: "Contraseña cambiada exitosamente" });
      },
      onFailure: (err) => {
        console.error("Error al cambiar la contraseña:", err);
        return res
          .status(400)
          .json({ error: "Error al cambiar la contraseña" });
      },
    });
  } catch (error) {
    console.error("Error general al cambiar la contraseña:", error);
    return res.status(400).json({ error: "Error al cambiar la contraseña" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Consultar todos los usuarios en la base de datos MySQL
    dbConnection.query("SELECT * FROM newschema.users", (error, result) => {
      if (error) {
        console.error("Error al obtener usuarios de la base de datos:", error);
        return res
          .status(500)
          .json({ error: "Error al obtener usuarios de la base de datos" });
      }

      // Devolver los datos de los usuarios como respuesta
      return res.status(200).json({ users: result });
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Controlador para eliminar un usuario
const deleteUser = (req, res) => {
  const userId = req.params.userId; // Obtener el ID del usuario de los parámetros de la consulta

  // Realizar la consulta para eliminar el usuario con el ID especificado
  dbConnection.query(
    "DELETE FROM users WHERE id = ?",
    userId,
    (error, result) => {
      if (error) {
        console.error("Error al eliminar usuario:", error);
        return res.status(500).json({
          error: "Error al eliminar usuario en la base de datos",
        });
      }

      // Verificar si se eliminó algún usuario
      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: "Usuario no encontrado",
        });
      }

      console.log("Usuario eliminado con éxito");
      res.status(200).json({
        message: "Usuario eliminado correctamente",
      });
    }
  );
};

module.exports = {
  getToken,
  registerUser,
  loginUser,
  resendConfirmationEmail,
  recoverAccount,
  resetPassword,
  getAllUsers,
  deleteUser,
};
