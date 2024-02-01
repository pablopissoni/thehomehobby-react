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
        res.status(201).json({ message: "Usuario registrado exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
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

    // Autenticar al usuario con Cognito
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        const token = session.getIdToken().getJwtToken();
        console.log("Usuario autenticado en Cognito. Token:", token);
        res.status(200).json({ token });
      },
      onFailure: (err) => {
        if (err.code === "UserNotConfirmedException") {
          console.error("El usuario no está confirmado en Cognito:", err);
          res.status(401).json({
            error: "Usuario no confirmado. Por favor, confirme su cuenta.",
          });
        } else {
          console.error("Error al autenticar usuario en Cognito:", err);
          res.status(401).json({ error: "Credenciales inválidas" });
        }
      },
    });
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { registerUser, loginUser };
