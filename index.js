import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import helmet from 'helmet'
import routesNodemailer from './routes.nodemailer.js'

const app = express();

app.use(cors({
    origin:["https://portfolio-lhermitteophelie.vercel.app"],
    credentials: true,
    methods:["GET","POST"]
})); 
app.use(helmet())
app.use(express.json());

dotenv.config();

app.use('/api', routesNodemailer)

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});

export default app;