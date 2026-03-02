import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import helmet from 'helmet'
import routesNodemailer from './routes.nodemailer.js'

const app = express();

app.set("trust proxy", 1)

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

app.get("/api/test-mail", async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: `postmaster@${process.env.MAILGUN_DOMAIN}`,
      to: "ophelie.lhermitte@gmail.com",
      subject: "Test Mailgun",
      text: "Hello world",
    });

    console.log(info);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur test mail:", error);
    res.status(500).json({ error: error.message });
  }
});

export default app;