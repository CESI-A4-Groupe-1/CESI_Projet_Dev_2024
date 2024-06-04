import express from "express"

const app = express();
app.listen(3001, () => {
    console.log(`Server running on port 3001`)
})

app.get("/", (req: any, res: any) => {
    res.status(200).json({msg: "Welcome to the Accounts Service"})
})