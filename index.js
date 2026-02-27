import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import helmet from 'helmet'
import routesNodemailer from './routes.nodemailer.js'

const app = express();

app.use(cors()); 
app.use(helmet())
app.use(express.json());

dotenv.config();

app.use('/api', routesNodemailer)

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
});

export default app;