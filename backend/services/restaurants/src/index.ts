require("dotenv").config()
import express from "express"
import routes from "./routes/restaurants.routes"

const app = express();
app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.listen(3003, () => {
    console.log(`Server running on port 3003`)
})

routes(app)

app.get("/", (req: any, res: any) => {
    res.send("Hello Accounts, Hello World!")
})