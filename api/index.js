const express = require("express");
const cors = require("cors");
const contactRouter = require("./router/contact-router");
const nodemailerConfig = require("./nodemailer-config.js");

const app = express();
app.use(cors());
app.use(express.json());

// router middleware
app.use("/contactus", contactRouter);

// Wrapper used due to async..await not allowed in global scope
async function main() {
    // setup test email account
    await nodemailerConfig.initTestAccount();
    await nodemailerConfig.initContactEmail();
    // start server on port 5000
    app.listen(5000, () => console.log("Server Running"));
}

// Call the main function with an error catch
main().catch(console.error);

