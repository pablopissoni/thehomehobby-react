const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const jwt = require("jsonwebtoken");
const dbConnection = require("../dbConfig");

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID,
  ClientId: process.env.COGNITO_CLIENT_ID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const registerUser = async (req, res) => {
  try {
    const { name, lastName, phone, email, password } = req.body;

    // Crear los atributos del usuario
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
      // Puedes agregar más atributos según tus necesidades
    ];

    // Registrar al usuario en Cognito
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.error("Error al registrar usuario en Cognito:", err);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        const cognitoUser = result.user;
        console.log("Usuario registrado en Cognito:", cognitoUser);

        // Manejar la confirmación del usuario
        if (result.userConfirmed) {
          // El usuario está confirmado, puedes devolver un token u otro dato según tus necesidades
          const token = result.getIdToken().getJwtToken();
          res
            .status(201)
            .json({ message: "Usuario registrado exitosamente", token });
        } else {
          // El usuario aún no está confirmado, debes manejar esto apropiadamente
          res.status(201).json({
            message: "Usuario registrado. Por favor, confirme su cuenta.",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const confirmAccount = async (req, res) => {
  try {
    const { email, confirmationCode } = req.body;

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        console.error("Error al confirmar cuenta en Cognito:", err);
        res.status(400).json({ error: "Error al confirmar cuenta" });
      } else {
        console.log("Cuenta confirmada:", result);
        res.status(200).json({ message: "Cuenta confirmada exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al confirmar cuenta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
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

    const session = await new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => resolve(session),
        onFailure: (err) => reject(err),
      });
    });

    console.log("Usuario autenticado en Cognito");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error al autenticar usuario en Cognito:", error);
    res.status(401).json({ success: false, error: "Credenciales inválidas" });
  }
};

module.exports = { registerUser, loginUser, confirmAccount };
