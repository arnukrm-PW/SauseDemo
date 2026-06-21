const checkoutLocators = require('../locators/checkoutLocator')

class CheckoutPOM {
    constructor(page) {
        this.page = page
    }
    async func_clickOnCheckoutCancel() {
        await this.page.locator(checkoutLocators.cancelButton).click()
    }
    async func_clickOnCheckoutContinue() {
        await this.page.locator(checkoutLocators.continueButton).click()
    }
    async func_fillcheckoutData(firstName, lastName, postalCode) {
        await this.page.locator(checkoutLocators.firstName).fill(firstName)
        await this.page.locator(checkoutLocators.lastName).fill(lastName)
        await this.page.locator(checkoutLocators.postalCode).fill(postalCode)

    }
    async func_getCheckoutDetails() {
        return {
            checkoutInformation: this.page.locator(checkoutLocators.checkoutInformation),
            cancelButton: this.page.locator(checkoutLocators.cancelButton),
            continueButton: this.page.locator(checkoutLocators.continueButton)
        }
    }
    async func_getCheckoutErrorMessage() {
        return await this.page.locator(checkoutLocators.errormsg).textContent()
    }
   
}
module.exports = CheckoutPOM