import express from "express"

const app = express();
app.listen(3001, () => {
    console.log(`Server running on port 3001`)
})

app.get("/", (req: any, res: any) => {
    res.send("Hello Orders Delivery, Hello World!")
})