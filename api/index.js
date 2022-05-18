const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

// Wrapper used due to async..await not allowed in global scope
async function main() {

    // Generate test account from ethereal.email
    let testAccount = await nodemailer.createTestAccount();

    // Create Transporter object
    let contactEmail = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    // Verify if email exists
    contactEmail.verify((error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Ready to Send");
        }
    });


    router.post("/contactus", async (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const subject = req.body.subject;
        const message = req.body.message;


    let info = await contactEmail.sendMail({
        from: email,
        to: "bar@example.com",
        subject: subject,
        html: `<p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Message: ${message}</p>`
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });


}

main().catch(console.error);