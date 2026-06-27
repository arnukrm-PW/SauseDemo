 const{test,expect} = require('../../../fixture/basefixture')


const{waitForElement,captureFailure} = require('../../../utils/dynamicWait')
const productLocator = require("../../../locators/productLocator")

test("TC _001 - Login test",async ({page,loginPage,productPage})=>{


// Navigate to App
//    await page.goto(process.env.APPURL)

//   // Login to App 
// await loginPage.func_login(process.env.SD_USERNAME,process.env.SD_PASSWORD)
 
  await expect(page).toHaveURL(/inventory/)

// About Page
   await productPage.func_aboutPage()
await expect(page).toHaveURL("https://saucelabs.com/")
await productPage.prevPage()
// logout
await productPage.func_logout()
await expect(page).toHaveURL("https://www.saucedemo.com/")
})