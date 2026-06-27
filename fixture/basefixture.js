const { test: base, expect } = require('@playwright/test')

//import POM
//Objects
const ProductPOM = require('../pages/productPOM')
const LoginPOM = require('../pages/loginPOM')
const CartPOM = require('../pages/cartPOM')
const CheckoutPOM = require('../pages/checkoutPOM')
const OverviewPOM = require('../pages/overviewPOM')
const CheckoutCompletePOM = require('../pages/checkoutCompletePOM')

exports.test = base.extend(
    {
        loginPage: async ({ page }, use) => {

            const loginPage = new LoginPOM(page)
            // Navigate to App
            await page.goto(process.env.APPURL)
            // Login to App 
            await loginPage.func_login(process.env.SD_USERNAME, process.env.SD_PASSWORD)
            await use(loginPage)
        },
        productPage: async ({ page }, use) => {

            const productPageRef = new ProductPOM(page)
            await use(productPageRef)
        },
        cartPage: async ({ page }, use) => {
            const cartPageRef = new CartPOM(page)
            await use(cartPageRef)
        },
        checkoutPage: async ({ page }, use) => {
            const checkoutRef = new CheckoutPOM(page)
            await use(checkoutRef)
        },
        overviewPage: async ({ page }, use) => {
            const overviewRef = new OverviewPOM(page)
            await use(overviewRef)
        },
        checkoutCompletePage: async ({ page }, use) => {
            const checkoutCompleteRef = new CheckoutCompletePOM(page)
            await use(checkoutCompleteRef)
        }
    })
exports.expect = expect