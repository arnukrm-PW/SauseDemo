const {test,expect} = require('@playwright/test')

test("PUT method validation ", async ({request})=>{
   const response = await request.put("https://jsonplaceholder.typicode.com/posts/1",{
    data:{
        name: "Satyam Kushwaha"
    }

    })
    console.log(response)

    expect(response.status()).toBe(200)
    expect(response.statusText()).toBe("OK")

    const jsonBody = await response.json()
    console.log(jsonBody)
    expect(jsonBody.name).toBe("Satyam Kushwaha")




})