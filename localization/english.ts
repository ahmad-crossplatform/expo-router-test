import { token } from "./appStructure";
export const english = {
  //common
  [token.common.login]: "Login",
  [token.common.register]: "Register",
  [token.common.email]: "Email",
  [token.common.password]: "Password",

  // errors
  [token.errors.required]: "This field is required *",
  [token.errors.emailFormat]: "Invalid email format",
  [token.errors.emailNotMatch]: "Emails do not match",
  [token.errors.passwordFormat]: "Password shuold be at least 6 characters",
  [token.errors.passwordNotMatch]: "Passwords do not match",

  // register screen
  [token.screens.registerScreen.firstName]: "First Name",
  [token.screens.registerScreen.lastName]: "Last Name",
  [token.screens.registerScreen.confirmEmail]: "Confirm Email",
  [token.screens.registerScreen.confirmPassword]: "Confirm Password",
  [token.screens.registerScreen.phoneNumber]: "Phone Number",
  [token.screens.registerScreen.dateOfBirth]: "Date of Birth",
  [token.screens.registerScreen.nationalId]: "National ID",


};
