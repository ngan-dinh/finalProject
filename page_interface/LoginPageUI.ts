export class LoginPageUI{
    static readonly LOGIN_BUTTON = 'button.orangehrm-login-button';
    static readonly USERNAME_TEXTBOX = 'input[name="username"]';
    static readonly PASSWORD_TEXTBOX= 'input[name="password"]';
    static readonly FORGOT_PASSWORD ='div.orangehrm-login-forgot';
    static readonly USERNAME_TEXTBOX_ERROR_MESSAGE ='//input[@name="username"]//parent::div//following-sibling::span';
    static readonly PASSWORD_TEXTBOX_ERROR_MESSAGE = '//input[@name="password"]//parent::div//following-sibling::span';
    static readonly LOGIN_ERROR_MESSAGE='//p[text()= "Invalid credentials"]';
}