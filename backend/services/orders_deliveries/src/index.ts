require("dotenv").config()
import express from "express"
import routes from "./routes/order_deliveries.routes"

const app = express();
app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.listen(3001, () => {
    console.log(`Server running on port 3001`)
})

routes(app)

app.get("/", (req: any, res: any) => {
    res.send("Welcome to the Orders and Deliveries Service")
})