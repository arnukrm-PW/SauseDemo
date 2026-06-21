const overviewLocator = require('../locators/overviewLocators')

class OverviewPOM{
constructor(page){
    this.page = page
}

async getURLandUIElements(){
    return{
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



}
module.exports=OverviewPOM