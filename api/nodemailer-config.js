const nodemailer = require("nodemailer");

// This file sets up the test accounts and creates the transport object
module.exports = {
    testAccount : null,
    contactEmail : null,

    // initialise the test accounts
    initTestAccount : async function () {
        this.testAccount = await nodemailer.createTestAccount();
    },

    // initialise the transport object
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
        
        // check the email and object were setup correctly
        this.contactEmail.verify((error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Ready to Send");
            }
        });
    }
    
}