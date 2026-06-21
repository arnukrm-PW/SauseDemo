const overviewLocator = require('../locators/overviewLocators')

class OverviewPOM {
    constructor(page) {
        this.page = page
    }

    async getURLandUIElements() {
        return {
            overviewTitle: await this.page.locator(overviewLocator.overviewTitle).textContent(),
            cancelButton: await this.page.locator(overviewLocator.cancelButton).textContent(),
            finishButton: await this.page.locator(overviewLocator.finishButton).textContent(),
            paymentInformation: await this.page.locator(overviewLocator.paymentInformation).textContent(),
            shippingInformation: await this.page.locator(overviewLocator.shippingInformation).textContent(),
            priceTotal: await this.page.locator(overviewLocator.priceTotal).textContent(),
            taxDetails: await this.page.locator(overviewLocator.taxDetails).textContent(),
            totalDetails: await this.page.locator(overviewLocator.totalDetails).textContent()

        }
    }
 async func_getAllProductDetails(){
        const allNames = await this.page.locator(overviewLocator.cartProductName).allTextContents()
        const allDescription = await this.page.locator(overviewLocator.cartProductDescription).allTextContents()
        const allPrice = await this.page.locator(overviewLocator.cartProductPrice).allTextContents()
        const allProducts = allNames.map((_,i)=>({
            
            C_Names : allNames[i].trim(),
            C_Description : allDescription[i].trim(),
            C_Price : allPrice[i].trim()
        }))
        return allProducts
    
    }


}
module.exports = OverviewPOM