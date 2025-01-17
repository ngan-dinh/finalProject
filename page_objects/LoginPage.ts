import { expect, Page } from "@playwright/test";
import BasePage from "./BasePage";
import { LoginPageUI } from "../page_interface/LoginPageUI";


export default class LoginPage extends BasePage {

    async openPage(url: string) {
        await this.redirectURL(url);
        await this.waitForPageLoad();
    }

    async clickToLoginButton() {
        await this.clickToElement(LoginPageUI.LOGIN_BUTTON);
    }

    async getErrorMessageOfUsernameTextbox() {
        return this.getTextOfElement(LoginPageUI.USERNAME_TEXTBOX_ERROR_MESSAGE);
    }

    async getErrorMessageOfPasswordTextbox() {
        return this.getTextOfElement(LoginPageUI.PASSWORD_TEXTBOX_ERROR_MESSAGE);
    }

    async inputUserNameValue(usernameText: string) {
        await this.fillElement(LoginPageUI.USERNAME_TEXTBOX, usernameText);
    }

    async inputPasswordValue(passwordText: string){
        await this.fillElement(LoginPageUI.PASSWORD_TEXTBOX, passwordText);
    }

    constructor(page: Page) {
        super(page);
    }


}