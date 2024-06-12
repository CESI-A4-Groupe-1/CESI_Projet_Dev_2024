require("dotenv").config()
import express from "express"
import routes from "./routes/statistics.routes"

const app = express();
app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.listen(3004, () => {
    console.log(`Server running on port 3004`)
})

routes(app)