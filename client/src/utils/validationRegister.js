export const validateRegistration = (userRegister) => {
  const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const regexPhone = /^\+[1-9]\d{1,14}$/; // AWS format for phone numbers
  const errorsObj = {};

  // Name validation
  if (userRegister.name === "") {
    errorsObj.name = "Name is required";
  }

  // Last name validation
  if (userRegister.lastName === "") {
    errorsObj.lastName = "Last name is required";
  }

  // Phone validation
  if (userRegister.phone === "") {
    errorsObj.phone = "Phone number is required";
  } else {
    if (!regexPhone.test(userRegister.phone)) {
      errorsObj.phone = "Incorrect phone number format";
    }
  }

  // Email validation
  if (userRegister.email === "") {
    errorsObj.email = "Email is required";
  } else {
    if (!regexEmail.test(userRegister.email)) {
      errorsObj.email = "Incorrect email format";
    }
  }

  // Password validation
  if (userRegister.password.length < 8) {
    errorsObj.password = "Password must be at least 8 characters long";
  }
  if (userRegister.password !== userRegister.passwordConfirmation) {
    errorsObj.passwordConfirmation = "Passwords do not match";
  }
  if (userRegister.passwordConfirmation === "") {
    errorsObj.passwordConfirmation = "Repeat your password";
  }

  return errorsObj;
};

// export const validateEmail = (userEmail) => {
//   const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
//   // const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2, })$/;
//   let errorEmail = "";

//   if (userEmail === "") {
//     errorEmail = "Email is required";
//   }
//   if (!regexEmail.test(userEmail)) {
//     errorEmail = "Incorrect email format";
//   }
//   // if (userEmail.length < 50) {
//   //   errorEmail = "Email must be at least 50 characters long";
//   // }

//   return errorEmail
// }

export const validateEmail = (userEmail) => {
  const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2, })$/;
  
  if (userEmail === "") {
    return true; // El email está vacío, es inválido
  }
  if (!regexEmail.test(userEmail)) {
    return true; // El email no cumple con el formato válido
  }
  // if (userEmail.length < 50) {
  //   return true; // El email es demasiado corto
  // }

  return false; // El email es válido
}