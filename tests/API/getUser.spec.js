const {test,expect} = require('@playwright/test')
const {getUsers01} =require('../../utils/api')

test("TC01 get user details",async ({request})=>{

   const response =  await request.get("https://jsonplaceholder.typicode.com/users")
    console.log(await response.json())

    expect(response.status()).toBe(200)
})

test("TC 02 getuser details",async ({})=>{

 const response = await getUsers01()
 //console.log(response)
 expect(await response.status()).toBe(200)
 const jsonBody = await response.json()
 expect.soft(Array.isArray(jsonBody)).toBeTruthy()
console.log(jsonBody.length)
expect(jsonBody.length).toBe(10)
const firstUser = jsonBody[0]
console.log(firstUser)
expect(firstUser.name).toBe("Leanne Graham")
expect(firstUser.id).toBeDefined()
expect(firstUser.email).toContain("@")
expect(firstUser.company.name).toBe("Romaguera-Crona")

})


