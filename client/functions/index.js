require("dotenv").config();
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

exports.submitQuery = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const {email} = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  const mailOptions = {
    from: "ssophieluo@gmail.com",
    to: "e1156777@u.nus.edu",
    subject: "New Query Submission",
    text: `A new query has been submitted by: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Query submitted successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error submitting query");
  }
});

