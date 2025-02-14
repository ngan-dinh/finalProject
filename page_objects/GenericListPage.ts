import { Page } from "@playwright/test";
import CommonPage from "./CommonPage";
import { GenericListPageUI } from "../page_interface/GenericListPageUI";

export default class GenericListPage extends CommonPage {
    async enterDateFromTextbox(dateFrom: string){
        await this.fillElement(GenericListPageUI.DATE_FROM_TEXTBOX, dateFrom)
    }
    
    async openPage(pageUrl:string){
        await this.redirectURL(pageUrl);
    }

    constructor(page: Page){
        super(page);
    }
}