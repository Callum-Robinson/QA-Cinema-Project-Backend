const nodemailer = require("nodemailer");

module.exports = {
    testAccount : null,
    contactEmail : null,
    initTestAccount : async function () {
        this.testAccount = await nodemailer.createTestAccount();
    },
    initContactEmail : async function () {
        this.contactEmail = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: this.testAccount.user,
                pass: this.testAccount.pass,
            },
        });
        
        this.contactEmail.verify((error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Ready to Send");
            }
        });
    }
    
}