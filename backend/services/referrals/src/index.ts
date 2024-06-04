import express from "express"

const app = express();
const port = 3005
app.use(express.json())

app.get('/', (req: any, res: any) => {
    res.send('Referrals')
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});