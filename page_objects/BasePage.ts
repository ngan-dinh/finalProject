import { Page } from '@playwright/test'
export default class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected async clickToElement(locator: string) {

        await this.highlightElement(locator);
        await this.page.click(locator);
    }

    protected async doubleClickToElement(locator: string) {
        await this.page.dblclick(locator);
    }

    protected async highlightElement(locator: string) {
        let originStyle: string;
        const element = this.page.locator(locator);

        //get orginal style
        await element.evaluate(el => originStyle = el.style.border);

        //apply new style
        await element.evaluate(el => el.style.border = '2px dash red');
        await this.page.waitForTimeout(500);

        //get old style
        await element.evaluate(el => el.style.border = originStyle);

    }

    protected async rightClickToElement(locator: string) {
        await this.highlightElement(locator);
        await this.page.click(locator, { button: 'right' });
    }

    protected async middleClickToEment(locator: string) {
        await this.highlightElement(locator);
        await this.page.click(locator, { button: 'middle' });
    }

    protected async fillElement(locator: string, inputValue: string) {
        await this.highlightElement(locator)
        await this.page.fill(locator, inputValue);
    }

    protected async checkToElement(locator: string) {
        await this.highlightElement(locator);
        await this.page.check(locator);
    }

    protected async uncheckElement(locator: string) {
        await this.highlightElement(locator);
        await this.page.uncheck(locator);
    }

    protected async hoverToElement(locator: string) {
        await this.highlightElement(locator);
        await this.page.hover(locator);

    }

    protected async scrollToElement(locator: string) {
        await this.page.locator(locator).scrollIntoViewIfNeeded();
    }

    protected async getPageURL() {
        return this.page.url();
    }

    protected async getTextOfElement(locator: string) {
        return this.page.locator(locator).innerText();
    }

    protected async isElementChecked(locator: string) {
        await this.page.locator(locator).isChecked();
    }

    protected async isElementVisible(locator: string) {
        await this.page.isVisible(locator);

    }

    protected async isElementHidden(locator: string) {
        await this.page.isHidden(locator);
    }

    protected async isElementDisable(locator: string) {
        await this.page.isDisabled(locator);
    }

    protected async isElementEnable(locator: string) {
        await this.page.isEnabled(locator);
    }

    protected async redirectURL(url: string){
        await this.page.goto(url);
    }

    protected async selectToDropdown(locator:string, option:string){
        //await this.page.locator(locator).selectOption(option);
        await this.page.locator(locator).selectOption({label: option});
    }

}