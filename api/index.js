const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const contactRouter = require("./router/contact-router");
const nodemailerConfig = require("./nodemailer-config.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/contactus", contactRouter);
// Wrapper used due to async..await not allowed in global scope
async function main() {
    await nodemailerConfig.initTestAccount();
    await nodemailerConfig.initContactEmail();
    app.listen(5000, () => console.log("Server Running"));
}

main().catch(console.error);

