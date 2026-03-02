import nodemailer from "nodemailer";

export const sendEmail = async ({ firstName, lastName, email, message }) => {
  try {
    const mailgunAuth = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      },
    };

    const transporter = nodemailer.createTransport(mg(mailgunAuth));

    const mailOptions = {
      from: `"${firstName} ${lastName}(via Portfolio)" <${process.env.MAILGUN_FROM}>`,
      to: process.env.MAILGUN_TO,
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
      replyTo: email,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message envoyé : %s", info.messageId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res.status(500).json({ error: "Erreur serveur, réessayez plus tard." });
  }
};

export default sendEmail;
