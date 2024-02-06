const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const jwt = require("jsonwebtoken");
const dbConnection = require("../dbConfig");
const app = require("../server");

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID,
  ClientId: process.env.COGNITO_CLIENT_ID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const registerUser = async (req, res) => {
  try {
    const { name, lastName, phone, email, password } = req.body;

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
        if (err.code === "UsernameExistsException") {
          return res.status(420).json({ error: "El usuario ya existe" });
        }
        return res.status(400).json({ error: "Error al registrar usuario" });
      }
      const cognitoUser = result.user;
      console.log("Usuario registrado en Cognito:", cognitoUser);

      if (result.userConfirmed) {
        const token = result.getIdToken().getJwtToken();
        return res
          .status(201)
          .json({ message: "Usuario registrado exitosamente", token });
      } else {
        return res.status(201).json({
          message: "Usuario registrado. Por favor, confirme su cuenta.",
        });
      }
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res.status(400).json({ error: "Error al registrar usuario" });
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
        return res.status(400).json({ error: "Error al confirmar cuenta" });
      } else {
        console.log("Cuenta confirmada:", result);
        return res
          .status(200)
          .json({ message: "Cuenta confirmada exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al confirmar cuenta:", error);
    return res.status(400).json({ error: "Error al confirmar cuenta" });
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
        return res.status(201).json({
          success: true,
          message: "Usuario autenticado correctamente",
          accessToken: accessToken,
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

module.exports = { registerUser, loginUser, confirmAccount };
