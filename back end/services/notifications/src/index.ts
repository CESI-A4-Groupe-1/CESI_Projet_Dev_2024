import express from "express"

const app = express();
app.listen(3006, () => {
    console.log(`Server running on port 3006`)
})

app.get("/", (req: any, res: any) => {
    res.send("Hello Notifications, Hello World!")
})