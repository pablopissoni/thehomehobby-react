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
    const generateUniqueID = () => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let id = "";
      for (let i = 0; i < 15; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return id;
    };

    let userId;
    let isDuplicateID = true;

    // Generar un ID único y asegurarse de que no esté duplicado en la base de datos
    while (isDuplicateID) {
      userId = generateUniqueID();
      // Consultar la base de datos para verificar si el ID ya existe
      const existingUser = await new Promise((resolve, reject) => {
        dbConnection.query(
          "SELECT id FROM users WHERE id = ?",
          [userId],
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
      });

      if (existingUser.length === 0) {
        isDuplicateID = false;
      }
    }
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

// Consultar todos los usuarios en la base de datos MySQL
const getUsers = async (req, res) => {
  try {
    // Consultar todos los usuarios en la base de datos MySQL
    dbConnection.query("SELECT * FROM newschema.users", (error, result) => {
      if (error) {
        console.error("Error al obtener usuarios de la base de datos:", error);
        return res
          .status(500)
          .json({ error: "Error al obtener usuarios de la base de datos" });
      }

      // Formatear el contenido y los filtros para cada sub-categorías
      const formattedResults = result.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        email_verified_at: user.email_verified_at,
        password: user.password,
        remember_token: user.remember_token,
        created_at: user.created_at,
        updated_at: user.updated_at,
        role: user.role,
        lastname: user.lastname,
        phone: user.phone,
      }));

      // Devolver los datos de los usuarios como respuesta
      return res.status(200).json(formattedResults);
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

const deleteUser = (req, res) => {
  const userId = req.params.userId; // Obtener el ID del usuario de los parámetros de la consulta

  // Realizar la consulta para obtener el email del usuario con el ID especificado
  dbConnection.query(
    "SELECT email FROM users WHERE id = ?",
    userId,
    async (error, result) => {
      if (error) {
        console.error("Error al buscar email del usuario:", error);
        return res.status(500).json({
          error: "Error al buscar email del usuario en la base de datos",
        });
      }

      // Verificar si se encontró el email del usuario
      if (result.length === 0) {
        return res.status(404).json({
          error: "Usuario no encontrado",
        });
      }

      const userEmail = result[0].email;

      // Eliminar al usuario de AWS Cognito
      const cognitoParams = {
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: userEmail,
      };

      try {
        await cognitoIdentityServiceProvider
          .adminDeleteUser(cognitoParams)
          .promise();
        console.log("Usuario eliminado de AWS Cognito con éxito");
      } catch (error) {
        console.error("Error al eliminar usuario de AWS Cognito:", error);
        return res.status(500).json({
          error: "Error al eliminar usuario de AWS Cognito",
        });
      }

      // Realizar la consulta para eliminar el usuario con el ID especificado de la base de datos MySQL
      dbConnection.query(
        "DELETE FROM users WHERE id = ?",
        userId,
        (error, result) => {
          if (error) {
            console.error(
              "Error al eliminar usuario de la base de datos:",
              error
            );
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

          console.log("Usuario eliminado con éxito de la base de datos");
          res.status(200).json({
            message: "Usuario eliminado correctamente",
          });
        }
      );
    }
  );
};

const editUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { role } = req.body;

    // Validar que el valor de role sea "admin" o "user"
    if (role !== "admin" && role !== "user") {
      return res.status(400).json({
        error: "El valor de 'role' debe ser 'admin' o 'user'",
      });
    }

    dbConnection.query(
      "UPDATE users SET role = ? WHERE id = ?",
      [role, userId],
      (error, result) => {
        if (error) {
          console.error("Error updating user role in database:", error);
          return res.status(500).json({
            error: "Error updating user role in the database",
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({
            error: "User not found",
          });
        }

        console.log("User role updated successfully in database");
        res.status(200).json({
          message: "User role updated successfully",
        });
      }
    );
  } catch (error) {
    console.error("Error updating user role:", error);
    let errorCode = 500;

    if (error.code === "BadRequestException") {
      errorCode = 400;
    }

    return res.status(errorCode).json({ error: error.message });
  }
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
  editUser,
  getUsers,
};
