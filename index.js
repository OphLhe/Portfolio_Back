import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import helmet from 'helmet'
import routesNodemailer from './routes.nodemailer.js'

const app = express();

app.use(cors({
    origin:["https://portfolio-lhermitteophelie.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods:["GET","POST"]
})); 
app.use(helmet())
app.use(express.json());

dotenv.config();

app.use('/api', routesNodemailer)

app.listen(process.env.PORT);

export default app;