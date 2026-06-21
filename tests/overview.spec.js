const { test, expect } = require('@playwright/test')
//Objects
const ProductPOM = require('../pages/productPOM')
const LoginPOM = require('../pages/loginPOM')
const CartPOM = require('../pages/cartPOM')
const CheckoutPOM = require('../pages/checkoutPOM')
const OverviewPOM = require('../pages/overviewPOM')
//locators
const loginLocators = require('../locators/loginLocators')
const productLocator = require('../locators/productLocator')
const cartLocators = require('../locators/cartLocator')
const checkoutLocators = require('../locators/checkoutLocator')
const overviewLocator = require('../locators/overviewLocators')
//testData
const testData = require('../test-data/testData')
const checkoutData = require('../test-data/checkoutData')


test.describe("cart page validation", () => {

    let loginPageRef;
    let productPageRef;
    let cartPageRef;
    let checkoutRef;
    let overviewRef;
    
    test.beforeEach(async ({ page }) => {

        loginPageRef = new LoginPOM(page)
        productPageRef = new ProductPOM(page)
        cartPageRef = new CartPOM(page)
        checkoutRef = new CheckoutPOM(page)
        overviewRef = new OverviewPOM(page)

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


})