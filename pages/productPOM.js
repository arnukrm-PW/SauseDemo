const { describe } = require('node:test')
const productLocators = require('../locators/productLocator')
const loginLocators = require('../locators/loginLocators')
const testData = require('../test-data/testData')

class ProductPOM {
    constructor(page) {
        this.page = page
        this.bookaDemo = page.getByRole("button", { name: "Book a Demo", exact: true })
    }


    // async waitForElement(page, locator){
    //     await page.locator(locator).waitFor({state:'visible'})

    // }
    async prevPage() {
        await this.page.goBack()
    }

    async func_aboutPage() {
        await this.page.click(productLocators.burgerMenu)
        await this.page.click(productLocators.aboutlink)

    }

    async func_logout() {
        await this.page.click(productLocators.burgerMenu)
        await this.page.click(productLocators.logoutlink)

    }

    async func_productElementsValidation() {
        const names = await this.page.locator(productLocators.productName).allTextContents()
        const descriptions = await this.page.locator(productLocators.productDesc).allTextContents()
        const price = await this.page.locator(productLocators.productPrice).allTextContents()
        const buttonCount = await this.page.locator(productLocators.addtocartButton).count()

        if (names === 0) {
            throw new Error("No Product Found")
        }
        if (names.length !== descriptions.length || names.length !== price.length || names.length !== buttonCount) {
            throw new Error("Missmatch between product details")
        }
    }

    async func_addfirstProducttoCart() {
        await this.page.locator(productLocators.addtocartButton).first().click()

    }

    async func_addAllProductstoCart() {
        const button = await this.page.locator(productLocators.addtocartButton)
        const count = await button.count()
        for (let i = 0; i < count; i++) {
            await button.nth(i).click()
            await this.page.waitForTimeout(1500)
        }
    }

    async func_addSpecificProducts(testData) {
        const ProductsList = await this.page.locator(productLocators.productName)
        const count = await ProductsList.count()
        //console.log(count)
        for (let i = 0; i < count; i++) {
            const PName = await ProductsList.nth(i).textContent()
            if (PName && testData.includes(PName.trim())) {
                await this.page.locator(productLocators.addtocartButton).nth(i).click()
                await this.page.waitForTimeout(1500)
            }
        }
    }
    async func_filterByNameAtoZ(){

    //    await this.page.locator(productLocators.filterName).click() 
       await this.page.selectOption(productLocators.filterName,"az") 
      
    }
     async func_filterByNameZtoA(){
        // await this.page.locator(productLocators.filterName).click() 
       await this.page.selectOption(productLocators.filterName,"za") 
      
    }
     async func_filterByPriceLowtoHigh(){
        // await this.page.locator(productLocators.filterName).click() 
       await this.page.selectOption(productLocators.filterName,"lohi") 
       
    }
     async func_filterByPriceHightoLow(){
        // await this.page.locator(productLocators.filterName).click() 
       await this.page.selectOption(productLocators.filterName,"hilo") 
       
    }
    async func_countTotalProducts(){
        return await this.page.locator(productLocators.productName)

    }
async func_getProductNamesWithoutallTextContent(){
        return await this.page.locator(productLocators.productName)
    }
async func_getProductDescriptionWithoutAllTextContent(){
return  this.page.locator(productLocators.productDesc)
}    
async func_getProductDescriptionwithAllTextContent(){
return  this.page.locator(productLocators.productDesc).allTextContents()
}    
    async func_getProductNames(){
        return await this.page.locator(productLocators.productName).allTextContents()
    }
    async func_getProductPrices(){
        const prices = await this.page.locator(productLocators.productPrice).allTextContents()
            return await prices.map((prices)=>parseFloat(prices.replace("$","")))
    }
    async func_gotoCartPage(){
        await this.page.locator(productLocators.cartlink).click()
       
    }
    async func_getfirstProductDetails(){
        const names = await this.page.locator(productLocators.productName).first().textContent()
        const Description = await this.page.locator(productLocators.productDesc).first().textContent()
        const price = await this.page.locator(productLocators.productPrice).first().textContent()
        
        return{
            name: names?.trim(),
            description: Description?.trim(),
            price: price?.trim()
        }
    }
    async func_getAllProductDetails(){
        const allNames = await this.page.locator(productLocators.productName).allTextContents()
        const allDescription = await this.page.locator(productLocators.productDesc).allTextContents()
        const allPrice = await this.page.locator(productLocators.productPrice).allTextContents()
        const allProducts = allNames.map((_,i)=>({
            
            Names : allNames[i].trim(),
            Description : allDescription[i].trim(),
            Price : allPrice[i].trim()
        }))
        return allProducts
    
    }
    async func_getSpecificProductDetails(testData){

         const allNames = await this.page.locator(productLocators.productName).allTextContents()
        const allDescription = await this.page.locator(productLocators.productDesc).allTextContents()
        const allPrice = await this.page.locator(productLocators.productPrice).allTextContents()
        const allProducts = allNames.map((_,i)=>({
            
            Names : allNames[i].trim(),
            Description : allDescription[i].trim(),
            Price : allPrice[i].trim()
        }))
        return allProducts.filter(p=>testData.includes(p.Names))
    }


}


module.exports = ProductPOM