enum common {
  login = "login-screen-login-text",
  register = "login-screen-register-text",
  email = "sign-up-screen-email-text",
  password = "sign-up-screen-password-text",
}
// screens
enum loginScreen {

}
enum registerScreen {
  firstName = "sign-up-screen-first-name-text",
  lastName = "sign-up-screen-last-name-text",
  confirmEmail = "sign-up-screen-confirm-email-text",
  confirmPassword = "sign-up-screen-confirm-password-text",
  phoneNumber = "sign-up-screen-phone-number-text",
  dateOfBirth = "sign-up-screen-date-of-birth-text",
  nationalId = "sign-up-screen-national-id-text",

}
enum profileScreen {
  email = "reset-password-screen-email-text",
  sendLink = "reset-password-screen-send-link-text",
  rememberPassword = "reset-password-screen-remember-password",
  checkEmailText = "reset-password-screen-check-email-text",
}


enum dashboardScreen {
  studentList = "overview-screen-student-list-text",
  checkedIn = "overview-screen-checked-in-text",
  checkedOut = "overview-screen-checked-out-text",
  temperature = "overview-screen-temperature-text",
  wind = "overview-screen-wind-text",
  today = "overview-screen-today-text",
  hello = "overview-screen-hello-text",
}
enum newsDetailsScreen {
  createLearningloop = "learning-subject-screen-create-learningloop-text",
  identityInfoText = "learning-subject-screen-identity-information-text",
  searchPlaceholder = "learning-subject-screen-search-placeholder-text",
}

enum errors {
  required = "error-required",
  emailFormat = "error-email-format",
  emailNotMatch = "error-email-not-match",
  passwordFormat = "error-password-format",
  passwordNotMatch = "error-password-not-match",
}



export const token = {
  screens: {
    loginScreen: loginScreen,
    registerScreen: registerScreen,
    profileScreen: profileScreen,
    dashboardScreen: dashboardScreen,
    newsDetailsScreen: newsDetailsScreen,

  },
  errors: errors,
  common: common,
};
