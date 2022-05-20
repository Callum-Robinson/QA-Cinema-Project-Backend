const nodemailerConfig = require("../nodemailer-config");
const nodemailer = require("nodemailer");

module.exports = {
    // The main post pathway for sending an email to our account from the
    // contact form
    sendEmail: async (req, res, next) => {
        const name = req.body.name;
        const email = req.body.email;
        const subject = req.body.subject;
        const message = req.body.message;

        // wrap in try catch block
        try {
            // use the sendMail function for the transport object
            let info = await nodemailerConfig.contactEmail.sendMail({
                from: email,
                to: "bar@example.com",
                subject: subject,
                html: `<p>Name: ${name}</p>
                        <p>Email: ${email}</p>
                        <p>Message: ${message}</p>`
            });
            // if successful send a json status for front end to use
            res.json({status: "Message Sent"});
    
            // log the information for the ethereal test account
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
        // catch errors and return an error status if so
        } catch (error) {
            res.json({status: "Error"})
            console.log(error);
        }
    }
}