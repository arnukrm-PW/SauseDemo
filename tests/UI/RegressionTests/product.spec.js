
const{test,expect} = require('@playwright/test')
const LoginPage=require('../../../pages/loginPOM')
const ProductPOM = require('../../../pages/productPOM')
const loginData = require('../../../test-data/loginData')
const productData = require('../../../test-data/productData')
const productLocator = require('../../../locators/productLocator')
const {waitForElement,captureFailure}= require('../../../utils/dynamicWait')

test.describe("Login Verification @regression",()=>{
let loginPageRef ;
let productPageRef;

test.beforeEach("Login Module",async ({page})=>{

 loginPageRef = new LoginPage(page)
   productPageRef = new ProductPOM(page)
    
 await loginPageRef.NavtoApp()
 await loginPageRef.func_login(process.env.SD_USERNAME,process.env.SD_PASSWORD)
 await waitForElement(page,"#react-burger-menu-btn")
await expect(page).toHaveURL(/inventory/)
})


test("PRD_001	Verify Product Count	Login and count products	All 6 products visible",async ({page})=>{
const totalProducts = await productPageRef.func_countTotalProducts()
 expect(totalProducts).toHaveCount(6)
})
test("PRD_002	Verify Product Name	Check product names	Correct names displayed",async ({page})=>{
const productName = await productPageRef.func_getProductNamesWithoutallTextContent()
for (let i=0;i<productData.expectedName.length;i++){
   await  expect(productName.nth(i)).toHaveText(productData.expectedName[i])
}

// console.log(productName)
//     expect(productName.length).toBe(6)
})
test("PRD_003	Verify Product Price	Check product prices	Prices displayed correctly",async ({page})=>{
const productDesc = await productPageRef.func_getProductDescriptionWithoutAllTextContent()
//const expectedDesc = await productPageRef.func_getProductDescriptionwithAllTextContent()
//console.log(expectedDesc)
//expect(productDesc).toHaveCount(6)
  for(let i =0;i<await productDesc.count();i++){
   await expect(productDesc.nth(i)).toContainText(productData.expectedDesc[i])
  }  

//console.log(productDesc)
})
test("PRD_004	Verify Product Image	Check images	All images visible",async ({page})=>{

    
})
test("PRD_005	Product Details Page	Click product	Product details open",async ({page})=>{

    
})
})




