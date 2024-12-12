import { Page } from "@playwright/test";
import BasePage from "./BasePage";
import { LoginPageUI } from "../page_interface/LoginPageUI";


export default class LoginPage extends BasePage {

    async openPage(url: string){
        await this.redirectURL(url);
        await this.waitForPageLoad();
    }

    async clickToLoginButton(){
        await this.clickToElement(LoginPageUI.LOGIN_BUTTON);
    }

    constructor (page: Page){
        super(page);
    }


}