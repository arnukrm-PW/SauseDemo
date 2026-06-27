//const { test, expect } = require('@playwright/test')
const { test, expect } = require('../../../fixture/basefixture')

// //Objects
// const ProductPOM = require('../../../pages/productPOM')
// const LoginPOM = require('../../../pages/loginPOM')
// const CartPOM = require('../../../pages/cartPOM')
// const CheckoutPOM = require('../../../pages/checkoutPOM')
// const OverviewPOM = require('../../../pages/overviewPOM')
// const CheckoutCompletePOM = require('../../../pages/checkoutCompletePOM')
// //locators
const loginLocators = require('../../../locators/loginLocators')
const productLocator = require('../../../locators/productLocator')
const cartLocators = require('../../../locators/cartLocator')
const checkoutLocators = require('../../../locators/checkoutLocator')
const overviewLocator = require('../../../locators/overviewLocators')
const checkoutCompleteLocators = require('../../../locators/checkoutCompleteLocators')

//testData
const testData = require('../../../test-data/testData')
const checkoutData = require('../../../test-data/checkoutData')
const {waitForElement}= require('../../../utils/dynamicWait')



test.describe("cart page validation", () => {

    // let loginPageRef;
    // let productPageRef;
    // let cartPageRef;
    // let checkoutRef;
    // let overviewRef;

    // test.beforeEach(async ({ page }) => {

    //     loginPageRef = new LoginPOM(page)
    //     productPageRef = new ProductPOM(page)
    //     cartPageRef = new CartPOM(page)
    //     checkoutRef = new CheckoutPOM(page)
    //     overviewRef = new OverviewPOM(page)

    //     // Navigate to App
    //     await page.goto(process.env.APPURL)

    //     // Login to App 
    //     await loginPageRef.func_login(process.env.SD_USERNAME, process.env.SD_PASSWORD)
        // await page.waitForSelector(".inventory_list")
        // await expect(page).toHaveURL(/inventory/)
        // await productPageRef.func_addAllProductstoCart()
        // // await productPageRef.func_addfirstProducttoCart()
        // await productPageRef.func_gotoCartPage()
        // await cartPageRef.func_clickOnCheckOutLink()
        // await checkoutRef.func_fillcheckoutData(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode)
        // await checkoutRef.func_clickOnCheckoutContinue()
    })
    test("TC_01 verify URL and UI Element on Overview Page", async ({ page,loginPage,productPage,cartPage,checkoutPage ,overviewPage}) => {
        const uiElements = await overviewPage.getURLandUIElements_Overview()
        console.log(uiElements)
        //URL Validation
        await expect(page).toHaveURL(/checkout-step-two/)

        //UI Elements
        await expect(uiElements.overviewTitle).toContain("Overview")
        await expect(Number(uiElements.priceTotal?.replace("Item total: $","").trim())).toBeGreaterThan(29.99)
        await expect(uiElements.cancelButton).toBeVisible()

    })
    test("TC_02 get overview product details", async ({ page,loginPage,productPage,cartPage,checkoutPage ,overviewPage }) => {

        const cartProductDetails = await overviewPage.func_getAllProductDetails_Overview()
        const price = await overviewPage.getItemTotal_Overview()
        const tax = await overviewPage.getTax_Overview()
        const total = await overviewPage.getTotal_Overview()
        console.log(cartProductDetails)
        console.log(`${price} and ${tax} and Total ${total}`)
    })
    test("TC_03 validate cancel button functionality ", async ({ page,loginPage,productPage,cartPage,checkoutPage ,overviewPage }) => {
        await overviewPage.cancel()
        await waitForElement(page,"#react-burger-menu-btn")
        expect(await page.locator(productLocator.burgerMenu)).toBeVisible()

    })
    test("TC_04 Finish functionality ", async ({ page,loginPage,productPage,cartPage,checkoutPage ,overviewPage }) => {
        await overviewPage.finish()
        await waitForElement(page,".title")
        expect(await page.locator(checkoutCompleteLocators.pageInfo)).toBeVisible()

    })
    test("TC_05 validate summation of prices",async ({page,loginPage,productPage,cartPage,checkoutPage ,overviewPage})=>{
        const overviewPorducts = await overviewPage.func_getAllProductDetails_Overview()
        console.log(overviewPorducts)
        const totalPriceSummation = overviewPorducts.reduce((sum,{O_Price})=>sum+parseFloat(O_Price.replace("$","")),0)
        console.log(`totalprice of selected products = ${"$"}${totalPriceSummation}`)
        const totolPriceCalculated =await overviewPage.getItemTotal_Overview()
        expect(totalPriceSummation).toEqual(totolPriceCalculated)
    })
    test("TC_06 validate total item + tax calculation",async ({page,loginPage,productPage,cartPage,checkoutPage ,overviewPage})=>{
        const tax = await overviewPage.getTax_Overview()
        console.log(tax)
        const totalPrice = await overviewPage.getItemTotal_Overview()
         console.log(totalPrice)
        const totalIncludingTax=await overviewPage.getTotal_Overview()
        console.log(totalIncludingTax)

        const expectedTotal = (totalPrice + tax)
        expect(totalIncludingTax).toEqual(expectedTotal)

    })
    test("TC_07 Validate final button functionality",async ({page,loginPage,productPage,cartPage,checkoutPage ,overviewPage})=>{
        await overviewPage.finish()
       // await waitForElement(page,".title")
        expect(await page.locator(checkoutCompleteLocators.pageInfo)).toBeVisible()
        expect(await page.locator(checkoutCompleteLocators.pageInfo)).toContainText("Complete")

    })
