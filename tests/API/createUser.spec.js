const{test,expect} = require('@playwright/test')

test("create user",async ({request})=>{

   const resonse = request.post("https://jsonplaceholder.typicode.com/posts",{

        data:{
            name:'Test User',
            email:'testUser@gmail.com'
        }
    })
const responsebody = (await resonse).json()
    console.log(await responsebody)
})