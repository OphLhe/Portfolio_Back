import nodemailer from "nodemailer";

export const sendEmail = async ({
  firstName,
  lastName,
  email,
  message,
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${firstName} ${lastName}(via Portfolio)" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `Nouveau message depuis le Portflio de : ${firstName} ${lastName} (${email})`,
      text: `
    Nom : ${firstName} ${lastName}
    Email : ${email}
    Message : ${message}
  `,
      html: `<p><strong>Nom :</strong> ${firstName} ${lastName}</p>
    <p><strong>Email :</strong> ${email}</p>
    <p><strong>Message :</strong></p>
    <p>${message}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message envoyé : %s", info.messageId);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw error;
  }
};

export default sendEmail;