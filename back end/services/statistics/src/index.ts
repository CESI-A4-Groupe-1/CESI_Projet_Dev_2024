import express from "express"

const app = express();
app.listen(3004, () => {
    console.log(`Server running on port 3004`)
})

app.get("/", (req: any, res: any) => {
    res.send("Hello Statistics, Hello World!")
})