import express from "express"

const app = express();
app.listen(3002, () => {
    console.log(`Server running on port 3002`)
})

app.get("/", (req: any, res: any) => {
    res.send("Hello Accounts, Hello World!")
})