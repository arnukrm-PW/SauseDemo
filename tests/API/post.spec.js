const{test,expect} = require('@playwright/test')

test("POST method " , async({request})=>{

    const response =await request.post("https://jsonplaceholder.typicode.com/posts",{
        data:{
            name:"Arun KUmar",
            email:"kumar@gmail.com"
        }
    })
//validate status methods
console.log(response.status())
expect(response.status()).toBe(201)
expect(response.statusText()).toBe("Created")

const header = await response.headers()
//validat header methods
expect(header["connection"]).toBe("keep-alive")
expect(header["content-type"]).toContain("application/json")


})