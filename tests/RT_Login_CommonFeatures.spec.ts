import { test, expect } from '@playwright/test';
import LoginPage from '../page_objects/LoginPage';
import { MethodHelpers } from '../utils/MethodHelpers';
import { LoginPageUI } from '../page_interface/LoginPageUI';
import{ DashboardPageUI} from '../page_interface/DashboardPageUI';
import DashboardPage from '../page_objects/DashboardPage';

var loginPage: LoginPage;
var dashboardPage : DashboardPage;
var pageUrl: string = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
const requiredMsg = 'Required';
const loginErrMesg = 'Invalid credentials';
const userName = 'Admin';
const password = 'admin123';

test.beforeEach(async ({ page }) => {

  MethodHelpers.addAttachedLink('reference link ',pageUrl);

  loginPage = new LoginPage(page);
  

  await test.step(`Redirect to URL = ${pageUrl}`, async () => {
    await loginPage.openPage(pageUrl);
  });
})

test('Verify Required message displayed by case 1', async()=>{

    await test.step(`Step 1: Click to login button`, async()=>{
      await loginPage.clickToLoginButton();
    });

    await test.step('Step 2: Verify required message display', async()=> {
      const userTextboxErrMsg = await loginPage.getErrorMessageOfUsernameTextbox();
      const passwordTextboxErrMsg = await loginPage.getErrorMessageOfPasswordTextbox();
      expect.soft(userTextboxErrMsg).toEqual(requiredMsg + 's');
      expect.soft(passwordTextboxErrMsg).toEqual(requiredMsg);
    });
});

test('Verify Required message displayed by case 2', async({page})=>{

  await test.step(`Step 1: Click to login button`, async()=>{
    await loginPage.clickToLoginButton();
  });

  await test.step('Step 2: Verify required message display', async()=> {
    await expect.soft(page.locator(LoginPageUI.USERNAME_TEXTBOX_ERROR_MESSAGE)).toBeVisible();
    await expect.soft(page.locator(LoginPageUI.USERNAME_TEXTBOX_ERROR_MESSAGE)).toHaveText(requiredMsg + 's');

    await expect.soft(page.locator(LoginPageUI.PASSWORD_TEXTBOX_ERROR_MESSAGE)).toBeVisible();
    await expect.soft(page.locator(LoginPageUI.PASSWORD_TEXTBOX_ERROR_MESSAGE)).toHaveText(requiredMsg);
  });
});

test('Verify Invalid credentials error displayed', async({page})=> {
  await test.step('Step 1: Click to login button', async()=> {
    await loginPage.inputUserNameValue(userName);
    await loginPage.inputPasswordValue('admin1234');
    await loginPage.clickToLoginButton();
  })

  await test.step('Step 2: Verify Invalid credentials error displayed', async()=> {
    await expect.soft(page.locator(LoginPageUI.LOGIN_ERROR_MESSAGE)).toBeVisible();
    await expect.soft(page.locator(LoginPageUI.LOGIN_ERROR_MESSAGE)).toHaveText(loginErrMesg);
  })
})

test('Verify login successfully', async({page})=>{

  await test.step('Step 1: Click to login button', async() =>{
    await loginPage.inputUserNameValue(userName);
    await loginPage.inputPasswordValue(password);
    await loginPage.clickToLoginButton();
  });

  await test.step('Step 2: Verify login successfully', async() =>{
    await expect.soft(page.locator(DashboardPageUI.DASHBOARD_HEADING)).toHaveText('Dashboard');
  });

});

test('Verify logout successfully', async({page})=>{
  
  await test.step('Step 1: Login successfully', async() =>{
    await loginPage.inputUserNameValue(userName);
    await loginPage.inputPasswordValue(password);
    await loginPage.clickToLoginButton();
    await expect.soft(page.locator(DashboardPageUI.DASHBOARD_HEADING)).toHaveText('Dashboard');
  });

  await test.step('Step 2: Click to Logout button', async()=>{
    dashboardPage = new DashboardPage(page);
    await dashboardPage.clickToLogoutButton();
  });

  await test.step('Step 3: Verify user is redirected to login page', async()=>{
    await expect.soft(page.locator(LoginPageUI.LOGIN_BUTTON)).toBeVisible();
  })

})