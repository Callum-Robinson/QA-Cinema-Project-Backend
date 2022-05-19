const nodemailerConfig = require("../nodemailer-config");
const nodemailer = require("nodemailer");

module.exports = {
    sendEmail: async (req, res, next) => {
        const name = req.body.name;
        const email = req.body.email;
        const subject = req.body.subject;
        const message = req.body.message;

        try {
            let info = await nodemailerConfig.contactEmail.sendMail({
                from: email,
                to: "bar@example.com",
                subject: subject,
                html: `<p>Name: ${name}</p>
                        <p>Email: ${email}</p>
                        <p>Message: ${message}</p>`
            });
            res.json({status: "Message Sent"});
    
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
        } catch (error) {
            res.json({status: "Error"})
            console.log(error);
        }
    }
}