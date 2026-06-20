const { test, expect } = require('@playwright/test')
const ProductPOM = require('../pages/productPOM')
const LoginPOM = require('../pages/loginPOM')
const loginLocators = require('../locators/loginLocators')
const productLocator = require('../locators/productLocator')
const testData = require('../test-data/testData')

test.describe("product page validation", () => {

    let loginPageRef;
    let productPageRef;

    test.beforeEach(async ({ page }) => {

        loginPageRef = new LoginPOM(page)
        productPageRef = new ProductPOM(page)


        // Navigate to App
        await page.goto(process.env.APPURL)

        // Login to App 
        await loginPageRef.func_login(process.env.SD_USERNAME, process.env.SD_PASSWORD)
        await page.waitForSelector(".inventory_list")
        await expect(page).toHaveURL(/inventory/)

    })

    test("TC_01 validate aboutPage ", async ({ page }) => {
        await productPageRef.func_aboutPage()
        await page.waitForTimeout(3000)
        await expect(page).toHaveURL(/saucelabs/)
    })

    test("TC_02 validate logoutPage", async ({ page }) => {

        await productPageRef.func_logout()
        await page.waitForTimeout(3000)
        await expect(page.locator(loginLocators.loginButton)).toBeVisible()
    })

    test("TC_03 Navigate aboutPage and Nav back", async ({ page }) => {

        await productPageRef.func_aboutPage()
        await page.waitForTimeout(3000)
        await expect(page).toHaveURL(/saucelabs/)
        await productPageRef.prevPage()
        await expect(page.locator(productLocator.burgerMenu)).toBeVisible()
    })
    test("TC_04 validate product names", async ({ page }) => {
        await productPageRef.func_productElementsValidation()
    })

    test("TC_05 add first product to cart", async ({ page }) => {
        await productPageRef.func_addfirstProducttoCart()
    })
    test("TC_06 Add all products to cart", async ({ page }) => {
        await productPageRef.func_addAllProductstoCart()
    })
    test("TC_07 add Specific products to Cart", async ({ page }) => {
        await productPageRef.func_addSpecificProducts(testData)

    })
    test("TC_08 validation filter By AtoZ",async ({page})=>{
        await productPageRef.func_filterByNameAtoZ()
        const namesAtoZ =await productPageRef.func_getProductNames()
        console.log(`TC_08 namesAtoZ ${namesAtoZ}`)
        const sorted = [...namesAtoZ].sort((a,b)=>a-b)
        expect(namesAtoZ).toEqual(sorted)
    
    
    })
     test("TC_09 validation filter By ZtoA",async ({page})=>{
        await productPageRef.func_filterByNameZtoA()
        const namesZtoA = await productPageRef.func_getProductNames()
        console.log(`TC_09 namesZtoA ${namesZtoA}`)
        const sorted = [...namesZtoA].sort().reverse()
        expect(namesZtoA).toEqual(sorted)
    })
     test("TC_10 validation filter By LowtoHigh",async ({page})=>{
        await productPageRef.func_filterByPriceLowtoHigh()
        const pricesLowToHigh = await productPageRef.func_getProductPrices()
        console.log(pricesLowToHigh)
            const sorted =  [...pricesLowToHigh].sort((a,b)=>a-b)
        expect(pricesLowToHigh).toEqual(sorted)

        })
     test("TC_11 validation filter By HighToLow",async ({page})=>{
        await productPageRef.func_filterByPriceHightoLow()
        const priceHighToLow = await productPageRef.func_getProductPrices() 
        console.log(priceHighToLow)
        const sorted =  [...priceHighToLow].sort((a,b)=>b-a)
        expect(priceHighToLow).toEqual(sorted)

    })
    test("TC_12 Goto Cart Page",async({page})=>{
        await productPageRef.func_gotoCartPage()
        expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
    })
    test("TC_013 get first product details",async({page})=>{
        await productPageRef.func_getfirstProductDetails()
    
    })



})