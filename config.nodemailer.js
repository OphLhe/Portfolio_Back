import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

export const sendEmail = async ({ firstName, lastName, email, message }) => {
  const auth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
    host: "api.eu.mailgun.net",
  };

  const transporter = nodemailer.createTransport(mg(auth));

  const mailOptions = {
    from: "Mailgun Sandbox <postmaster@sandbox30d30147c7974b8dbf05ac93866aec50.mailgun.org>",
    to: "ophelie.lhermitte@gmail.com",
    subject: `Nouveau message depuis le portfolio de : ${firstName} ${lastName} (${email})`,
    text: `Nom: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p><strong>Nom :</strong> ${firstName} ${lastName}</p>
           <p><strong>Email :</strong> ${email}</p>
           <p><strong>Message :</strong> ${message}</p>`,
    replyTo: email,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message envoyé :", info);
    return info;
  } catch (error) {
    console.error("Erreur Mailgun :", error);
    throw error;
  }
};

export default sendEmail;