import { token } from "./appStructure";
export const arabic = {
  [token.common.login]: "تسجيل الدخول",
  [token.common.register]: "إنشاء حساب",
  [token.common.email]: "البريد الإلكتروني",
  [token.common.password]: "كلمه السر",

  // errors in Arabic
  [token.errors.required]: "هذا الحقل مطلوب",
  [token.errors.emailFormat]: "صيغة البريد الإلكتروني غير صالحة",
  [token.errors.emailNotMatch]: "البريد الإلكتروني غير متطابق",
  [token.errors.passwordFormat]: "يجب أن تكون كلمة المرور على الأقل 6 أحرف",
  [token.errors.passwordNotMatch]: "كلمات المرور غير متطابقة",

  // register screen in Arabic
  [token.screens.registerScreen.firstName]: "الاسم الأول",
  [token.screens.registerScreen.lastName]: "الكنية",
  [token.screens.registerScreen.confirmEmail]: "تأكيد البريد الإلكتروني",
  [token.screens.registerScreen.confirmPassword]: "تأكيد كلمة المرور",
  [token.screens.registerScreen.phoneNumber]: "رقم الهاتف",
  [token.screens.registerScreen.dateOfBirth]: "تاريخ الولادة",
  [token.screens.registerScreen.nationalId]: "الرقم القومي",

};
