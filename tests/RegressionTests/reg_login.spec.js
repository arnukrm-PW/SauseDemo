const{test,expect} = require('@playwright/test')
const LoginPage=require('../../pages/loginPOM')
const ProductPOM = require('../../pages/productPOM')

test.describe("Login Verification",()=>{
let loginPageRef ;
let productPageRef;

test.beforeEach("Login Module",async ({page})=>{

 loginPageRef = new LoginPage(page)
   productPageRef = new ProductPOM(page)
    
 await loginPageRef.NavtoApp()

})

 test("LGN_001 Valid Login Enter valid username/password User lands on inventory page",async({page})=>{
        
   await expect(page).toHaveURL("https://www.saucedemo.com/")
    await loginPageRef.func_login(process.env.SD_USERNAME,process.env.SD_PASSWORD)
    await expect(page).toHaveURL(/inventory/)
     })
test("LGN_002 Invalid Password Enter wrong password Error message displayed",async({page})=>{
        
   await expect(page).toHaveURL("https://www.saucedemo.com/")
     await loginPageRef.func_login(process.env.SD_USERNAME,process.env.SD_INV_PASSWORD)
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service')
     })
test("LGN_003 Invalid Username Enter wrong username Error message displayed",async({page})=>{
await expect(page).toHaveURL("https://www.saucedemo.com/")
     await loginPageRef.func_login(process.env.SD_INV_USERNAME,process.env.SD_PASSWORD)
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service')
})

test("LGN_004 Empty Username Leave username blank Validation/error shown",async({page})=>{
    await expect(page).toHaveURL("https://www.saucedemo.com/")
     await loginPageRef.func_login("","")
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required')
})

test("LGN_005 Empty Password Leave password blank Validation/error shown",async({page})=>{
     await expect(page).toHaveURL("https://www.saucedemo.com/")
     await loginPageRef.func_login(process.env.SD_USERNAME,"")
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Password is required')
})

test("LGN_006 Locked User Login Use locked_out_user	Proper lockout error displayed",async({page})=>{
      await expect(page).toHaveURL("https://www.saucedemo.com/")
     await loginPageRef.func_login(process.env.SD_LOCK_USERNAME,process.env.SD_PASSWORD)
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.')
})
test("LGN_007	Logout	Login → click menu → logout	Redirected to login page",async({page})=>{
      await expect(page).toHaveURL("https://www.saucedemo.com/")
    await loginPageRef.func_login(process.env.SD_USERNAME,process.env.SD_PASSWORD)
    await expect(page).toHaveURL(/inventory/)
    await productPageRef.func_logout()
    await expect(page.locator("#login-button")).toBeVisible()

})
})