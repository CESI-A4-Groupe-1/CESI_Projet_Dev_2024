require("dotenv").config()
import express from "express"
import routes from "./routes/auth.routes"

const app = express();
app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.listen(3002, () => {
    console.log(`Server running on port 3002`)
})

routes(app)

app.get("/", (req: any, res: any) => {
    res.send("Hello Accounts, Hello World!")
})