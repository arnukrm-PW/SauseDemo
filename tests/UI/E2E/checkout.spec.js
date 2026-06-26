const { test, expect } = require('@playwright/test')
const ProductPOM = require('../../../pages/productPOM')
const LoginPOM = require('../../../pages/loginPOM')
const CartPOM = require('../../../pages/cartPOM')
const CheckoutPOM = require('../../../pages/checkoutPOM')
const loginLocators = require('../../../locators/loginLocators')
const productLocator = require('../../../locators/productLocator')
const cartLocators = require('../../../locators/cartLocator')
const checkoutLocators = require('../../../locators/checkoutLocator')
const testData = require('../../../test-data/testData')
const checkoutData = require('../../../test-data/checkoutData')
const {waitForSelector}=require('../../../utils/dynamicWait')

test.describe("cart page validation", () => {

    let loginPageRef;
    let productPageRef;
    let cartPageRef;
    let checkoutRef;
    test.beforeEach(async ({ page }) => {

        loginPageRef = new LoginPOM(page)
        productPageRef = new ProductPOM(page)
        cartPageRef = new CartPOM(page)
        checkoutRef = new CheckoutPOM(page)

        // Navigate to App
        await page.goto(process.env.APPURL)

        // Login to App 
        await loginPageRef.func_login(process.env.SD_USERNAME, process.env.SD_PASSWORD)
        await page.waitForSelector(".inventory_list")
        await expect(page).toHaveURL(/inventory/)
        await productPageRef.func_addfirstProducttoCart()
        await productPageRef.func_gotoCartPage()
        await cartPageRef.func_clickOnCheckOutLink()

    })
    test("TC_01 checkout fill your information", async ({ page }) => {

        await checkoutRef.func_fillcheckoutData(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode)
        expect(await page.locator(checkoutLocators.firstName)).toHaveValue("arun")
        //await waitForElement(page,"#last-name")
        expect(await page.locator(checkoutLocators.lastName)).toHaveValue("kumar")
        expect(await page.locator(checkoutLocators.postalCode)).toHaveValue("712202")

    })
    test("TC_02 validate URL and UI elements on checkout page", async ({ page }) => {

        const checkoutElements = await checkoutRef.func_getCheckoutDetails()
        //URL verification
        expect(page).toHaveURL(/checkout/)
        // UI Elements verification on Checkout page
        await expect(checkoutElements.checkoutInformation).toBeVisible()
        await expect(checkoutElements.cancelButton).toBeVisible()
        await expect(checkoutElements.continueButton).toBeVisible()

    })
    test("TC_03 validate CANCEL button on checkout page", async ({ page }) => {
        await checkoutRef.func_clickOnCheckoutCancel()
        await expect(page).toHaveURL(/cart/)
    })

    test("TC_04 validate CONTINUE button on checkout page", async ({ page }) => {
        await checkoutRef.func_fillcheckoutData(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode)
        await checkoutRef.func_clickOnCheckoutContinue()

        await expect(page).toHaveURL(/checkout-step/)
    })
    test("TC_05 validate Error message on checkout page", async ({ page }) => {
        await checkoutRef.func_fillcheckoutData("", "", "")
        await checkoutRef.func_clickOnCheckoutContinue()
        const errormsg = await checkoutRef.func_getCheckoutErrorMessage()
        console.log(errormsg)
        expect(errormsg).toContain("Error:")

    })
   

  

    

})