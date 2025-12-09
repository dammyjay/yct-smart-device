// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // use TLS instead of SSL
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// exports.sendOtpEmail = (to, otp) => {
//   return transporter.sendMail({
//     to,
//     subject: "Your OTP Code",
//     text: `Your OTP is: ${otp}`,
//   });
// };




const Brevo = require("@getbrevo/brevo");

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

async function sendEmail(to, subject, htmlContent) {
  try {
    const sendSmtpEmail = {
      to: [{ email: to }],
      sender: { email: process.env.BREVO_FROM, name: "Smart Device" },
      subject,
      htmlContent,
    };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent:", data.messageId || data);
    return data;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
}

module.exports = sendEmail;
