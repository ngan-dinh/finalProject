import { test, expect } from '@playwright/test';
import LoginPage from '../page_objects/LoginPage';
import { MethodHelpers } from '../utils/MethodHelpers';

var loginPage: LoginPage;
var pageUrl: string = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

test.beforeEach(async ({ page }) => {

  MethodHelpers.addAttachedLink('reference link ',pageUrl);

  loginPage = new LoginPage(page);

  await test.step(`Redirect to URL = ${pageUrl}`, async () => {
    await loginPage.openPage(pageUrl);
  });
})

test('Verify Required message displayed', async()=>{

    await test.step(`Click to login button`, async()=>{
      await loginPage.clickToLoginButton();
    });


});