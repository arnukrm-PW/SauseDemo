const { test, expect } = require('@playwright/test')

//Objects
const ProductPOM = require('../../pages/productPOM')
const LoginPOM = require('../../pages/loginPOM')
const CartPOM = require('../../pages/cartPOM')
const CheckoutPOM = require('../../pages/checkoutPOM')
const OverviewPOM = require('../../pages/overviewPOM')
const CheckoutCompletePOM = require('../../pages/checkoutCompletePOM')

//locators
const loginLocators = require('../../locators/loginLocators')
const productLocator = require('../../locators/productLocator')
const cartLocators = require('../../locators/cartLocator')
const checkoutLocators = require('../../locators/checkoutLocator')
const overviewLocator = require('../../locators/overviewLocators')
const checkoutCompleteLocators = require('../../locators/checkoutCompleteLocators')

//testData
const testData = require('../../test-data/testData')
const checkoutData = require('../../test-data/checkoutData')


test.describe("cart page validation", () => {

    let loginPageRef;
    let productPageRef;
    let cartPageRef;
    let checkoutRef;
    let overviewRef;
    let checkoutCompleteRef;

    test.beforeEach(async ({ page }) => {

        loginPageRef = new LoginPOM(page)
        productPageRef = new ProductPOM(page)
        cartPageRef = new CartPOM(page)
        checkoutRef = new CheckoutPOM(page)
        overviewRef = new OverviewPOM(page)
        checkoutCompleteRef = new CheckoutCompletePOM(page)

        // Navigate to App
        await page.goto(process.env.APPURL)

        // Login to App 
        await loginPageRef.func_login(process.env.SD_USERNAME, process.env.SD_PASSWORD)
        await page.waitForSelector(".inventory_list")
        await expect(page).toHaveURL(/inventory/)
        await productPageRef.func_addAllProductstoCart()
        await productPageRef.func_gotoCartPage()
        await cartPageRef.func_clickOnCheckOutLink()
        await checkoutRef.func_fillcheckoutData(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode)
        await checkoutRef.func_clickOnCheckoutContinue()
        await overviewRef.finish()
    })
    test(" TC_01 validate URL and UI Element of CheckoutComplete Page", async ({ page }) => {
      //  await checkoutCompleteRef.func_goBackHometoProductPage()

      //URL verification
        const uiElements = await checkoutCompleteRef.func_getfinalPageInfo()
        expect(page).toHaveURL(/checkout-complete/)
        // UI Elements verificaiton
        console.log(uiElements)
        expect(uiElements.pageInfo).toContain("Complete!")
        expect(uiElements.thankyouInfo).toContain("Thank you")
        expect(uiElements.thankyouDescription).toContain("Your order has been dispatched")

    })
    test("TC_02 success message",async ({page})=>{
const successMessage = await checkoutCompleteRef.func_getSuccessMessageText()
        expect(successMessage).toContain("Thank you")
    })
    test("TC_03 BachHome Validation",async({page})=>{

        await checkoutCompleteRef.func_goBackHometoProductPage()
        expect(page).toHaveURL(/inventory/)
    })
})