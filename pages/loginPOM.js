const loginLocators = require("../locators/loginLocators")

class LoginPOM{

constructor(page){
    this.page=page
}
async NavtoApp(){
    await this.page.goto(process.env.APPURL)
    
}

async func_login(username,password){
    await this.page.fill(loginLocators.usernameInput,username)
    await this.page.fill(loginLocators.passwordInput,password)
    await this.page.click(loginLocators.loginButton)

}


}
module.exports=LoginPOM