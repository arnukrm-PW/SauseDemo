const {request} = require('@playwright/test')

async function getUsers(){

    const apiContext =await  request.newContext()
    const response = await apiContext.get("https://jsonplaceholder.typicode.com/users")
    
    console.log(response)
    return response
}
async function  getUsers01(){
    const apiContext = await request.newContext()
   const response =await apiContext.get("https://jsonplaceholder.typicode.com/users")
console.log(response)
return response
}



module.exports= {getUsers,getUsers01}