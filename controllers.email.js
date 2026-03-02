import rateLimit from "express-rate-limit";
import { sendEmail } from "./config.nodemailer.js";

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { error: "Trop de tentatives, réessayez plus tard." },
});

export const sendingEmail = async (req, res) => {
  const { honeypot, firstName, lastName, email, message } = req.body;

  try {
    if (honeypot) {
      return res.status(400).json({ error: "Spam détecté" });
    }

    if (!firstName || !lastName || !email || !message) {
      return res
        .status(400)
        .json({ error: "Tous les champs sont obligatoires." });
    }

    if (
      firstName.length > 50 ||
      lastName.length > 100 ||
      email.length > 320 ||
      message.length > 2000
    ) {
      return res.status(400).json({ error: "Entrées trop longues." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email invalide." });
    }

    await sendEmail({ firstName, lastName, email, message });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur serveur, réessayez plus tard." });
  }
};
