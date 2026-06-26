const{test,expect} = require('@playwright/test')

test("Delete validation",async ({request})=>{

const response = request.delete("https://jsonplaceholder.typicode.com/posts/1")
expect((await response).status()).toBe(200)
expect.soft((await response).statusText()).toBe("OK")

})


