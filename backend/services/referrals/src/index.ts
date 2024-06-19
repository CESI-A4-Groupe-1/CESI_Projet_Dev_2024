require("dotenv").config()
import express from "express"
import routes from "./routes/referrals.routes"

const app = express();
app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.listen(3005, () => {
    console.log(`Server running on port 3005`)
})

routes(app)

app.get("/", (req: any, res: any) => {
    res.send("Welcome to the Referrals Service")
})