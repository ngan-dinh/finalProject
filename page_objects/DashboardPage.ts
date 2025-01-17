import { expect, Page } from "@playwright/test";
import BasePage from "./BasePage";
import{ DashboardPageUI} from '../page_interface/DashboardPageUI';


export default class DashboardPage extends BasePage {

    async openPage(url: string) {
        await this.redirectURL(url);
        await this.waitForPageLoad();
    }

    async clickToLogoutButton() {
        await this.clickToElement(DashboardPageUI.USER_PROFILE_NAME);
        await this.clickToElement(DashboardPageUI.LOGOUT_LINK);
    }

    constructor(page: Page) {
        super(page);
    }


}