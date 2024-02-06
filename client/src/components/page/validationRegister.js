// validatorRegister.js
export const validateRegistration = (userRegister) => {
  const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const errorsObj = {};

  // Validacion Name
  if (userRegister.name === "") {
    errorsObj.name = "El nombre es obligatorio";
  }

  // Validacion LastName
  if (userRegister.lastName === "") {
    errorsObj.lastName = "El apellido es obligatorio";
  }

  // Validacion Email
  if (userRegister.email === "") {
    errorsObj.email = "El email es obligatorio";
  } else {
    if (!regexEmail.test(userRegister.email)) {
      errorsObj.email = "Formato de email incorrecto";
    }
  }

  // Validacion Password
  if (userRegister.password.length < 8) {
    errorsObj.password = "La contraseña debe tener al menos 8 caracteres";
  }
  if (userRegister.password !== userRegister.passwordConfirmation) {
    errorsObj.passwordConfirmation = "La contraseña no coincide";
  }
  if (userRegister.passwordConfirmation === "") {
    errorsObj.passwordConfirmation = "Repita su contraseña";
  }

  return errorsObj;
};
