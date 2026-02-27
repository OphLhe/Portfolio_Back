import express from 'express'; 
import { contactLimiter, sendingEmail } from './controllers.email.js';

const router = express.Router();

router.post('/sendEmail', contactLimiter, sendingEmail)

export default router;