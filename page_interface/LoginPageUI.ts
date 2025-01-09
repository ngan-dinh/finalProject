export class LoginPageUI{
    static readonly LOGIN_BUTTON = 'button.orangehrm-login-button';
    static readonly USERNAME_TEXTBOX = 'input[name="username"]';
    static readonly PASSWORD_TEXTBOX= 'input[name="password"]';
    static readonly FORGOT_PASSWORD ='div.orangehrm-login-forgot';
    static readonly USERNAME_ERRORMESSAGE ='//input[@name="username"]//parent::div//following-sibling::span';
    static readonly PASSWORD_ERRORMESSAGE = '//input[@name="password"]//parent::div//following-sibling::span';
}