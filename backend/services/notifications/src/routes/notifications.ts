import { Router } from 'express';
import { messaging } from '../firebaseAdmin';
import NotificationsController from "../controllers/notifications.controller";

const router = Router();

// In-memory store for tokens for simplicity. Replace with a database in production.
// const tokens: string[] = [];

router.post('/register/:user_id', (new NotificationsController()).register);

router.post('/send/:user_id', (new NotificationsController()).send);

export default router;
