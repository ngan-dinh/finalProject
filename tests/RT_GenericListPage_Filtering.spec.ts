import { test, expect } from '@playwright/test';
import GenericListPage from '../page_objects/GenericListPage';
import { GenericListPageUI } from '../page_interface/GenericListPageUI';
import { MethodHelpers } from '../utils/MethodHelpers';
import CommonPage from '../page_objects/CommonPage';

var genericListPage: GenericListPage;
var pageUrl: string = 'https://www.ericsson.com/en/cases?locs=68304,47175';

const dateFrom='2024-08-05'


test.beforeEach(async ({ page }) => {

    MethodHelpers.addAttachedLink('reference link ', pageUrl);

    genericListPage = new GenericListPage(page);


    await test.step(`Redirect to URL = ${pageUrl}`, async () => {
        await genericListPage.openPage(pageUrl);
        await genericListPage.clickToAcceptCookieBtn();
    });


})

test('Verify Required message displayed by case 1', async()=>{

   await test.step (`enter to date from textbox = ${dateFrom}`, async()=>{
    await genericListPage.enterDateFromTextbox(dateFrom);
   })

});


