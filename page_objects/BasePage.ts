import { Page } from '@playwright/test'
import path from 'path';
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

    protected async redirectURL(url: string) {
        await this.page.goto(url);
    }

    protected async selectToDropdown(locator: string, option: string) {
        //await this.page.locator(locator).selectOption(option);
        await this.page.locator(locator).selectOption({ label: option });
    }

    protected async getInputValueOfElement(locator: string) {
        return this.page.locator(locator).inputValue();
    }

    protected async getAttributeValueOfElement(locator: string, attributeValue: string) {
        return this.page.locator(locator).getAttribute(attributeValue);
    }

    protected async refeshPage() {
        await this.page.reload();
    }

    protected async getNumberOfElement(locator: string) {
        const element = await this.page.$$(locator);
        //const element = await this.page.locator(locator).all();
        return element.length;
    }

    protected async blurToElement(locator: string) {
        await this.page.locator(locator).blur();
    }

    protected async uploadFile(locator: string, fileName: string) {
        const pathToFile = path.resolve(__dirname, fileName);
        await this.page.locator(locator).setInputFiles(pathToFile);
    }

    protected async uploadMultipleFile(locator: string, ...fileNames: string[]) {
        let filePaths: string[] = fileNames.map(fileName => path.resolve(__dirname, fileName));
        await this.page.locator(locator).setInputFiles(filePaths);
    }

    protected async scrollToPageTop() {
        await this.page.evaluate(() => window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        }))
    }

    protected async hideElement(locator: string) {
        await this.page.locator(locator).evaluate(el => el.style.display = 'none !important')
    }

    protected async redirectBack() {
        await this.page.goBack();
    }

    protected async redirectForward() {
        await this.page.goForward();
    }

    protected async getPageSource() {
        return this.page.content();
    }

    protected async clickToElementInIframe(locator: string, frameLocator: string) {
        const iframeLocator = this.page.locator(frameLocator);
        await iframeLocator.locator(locator).click();
    }

    protected async fillToELementIFrame(locator: string, frameLocator: string, inputValue: string) {
        const ifameLocator = this.page.locator(frameLocator);
        await ifameLocator.locator(locator).fill(inputValue);
    }

    protected async waitForElementVisible(locator: string, timeout?: number) {
        await this.page.locator(locator).waitFor({
            state: 'visible',
            timeout: timeout
        })
    }

    protected async waitForELementHidden(locator: string, timeout?: number) {
        await this.page.locator(locator).waitFor({
            state: 'hidden',
            timeout: timeout
        })
    }

    protected async waitForELementPresent(locator: string, timeout?: number) {
        await this.page.locator(locator).waitFor({
            state: 'attached',
            timeout: timeout
        })
    }

    protected async waitForELementStale(locator: string, timeout?: number) {
        await this.page.locator(locator).waitFor({
            state: 'detached',
            timeout: timeout
        })
    }

    protected async getTextOfAllElements(locator: string): Promise<string[]> {
        const elements = await this.page.locator(locator).all();
        const textOfElemts: string[] = [];

        for (let i = 0; i < elements.length; i++) {
            textOfElemts.push(await elements[i].innerText());
        }

        return textOfElemts;
    }

    protected async waitForPageLoad(maxRetries: number = 3) {
        try {
            await this.page.waitForSelector('html', { state: 'attached' });
            await this.page.waitForLoadState('domcontentloaded');

            for (let attempt = 0; attempt < maxRetries; attempt++) {
                const pageLoadStatus = await this.page.evaluate(() => document.readyState);
    
                if (pageLoadStatus === "complete") {
                    return;
                }

                // wait for a bit
                await this.page.waitForTimeout(500);
            }
           
            console.warn('Page did not reach "complete" status within retries')
        } catch (error) {
            console.log('Error waiting for page load: ', error);
        }
    }

    protected async waitForTimeout(timeout: number){
        
    }






}