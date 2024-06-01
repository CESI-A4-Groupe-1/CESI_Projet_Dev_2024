import express from "express"

const app = express();
app.listen(3005, () => {
    console.log(`Server running on port 3005`)
})

app.get("/", (req: any, res: any) => {
    res.send("Hello Referrals, Hello World!")
})