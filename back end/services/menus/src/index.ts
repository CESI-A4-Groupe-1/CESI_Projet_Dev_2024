import express from "express"

const app = express();
app.listen(3003, () => {
    console.log(`Server running on port 3003`)
})

app.get("/", (req: any, res: any) => {
    res.send("Hello Menus & Articles, Hello World!")
})