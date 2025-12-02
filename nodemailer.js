import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const password = process.env.APP_PASSWORD;

async function sendEmail(to, subject, html){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "akashtwilio@gmail.com",
            pass: password
        }
    })

    const mailOptions = {
        from: "akashtwilio@gmail.com",
        to: "akashs.smch@gmail.com",
        subject,
        html
    }

    await transporter.sendMail(mailOptions)
}

sendEmail(
    "akashtwilio@gmail.com",
    "This is test email",
    "<h1>This is test email body</h1>"
)