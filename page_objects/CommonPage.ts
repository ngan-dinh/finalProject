import { Page } from "@playwright/test";
import BasePage from "./BasePage";
import { CommonPageUI } from "../page_interface/CommonPageUI"; 

export default class CommonPage extends BasePage {

    async clickToAcceptCookieBtn() {
        await this.clickToElement(CommonPageUI.ACCEPT_ALL_COOKIE_BUTTON);
    }

    constructor (page: Page){
        super(page);
    }

}