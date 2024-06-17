// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import notificationRoutes from './routes/notifications';

const app = express();

app.use(bodyParser.json());
app.use('/notifications', notificationRoutes);

const PORT = 3006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
