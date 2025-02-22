const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

//transport function
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;

    //validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please provide all the fields",
      });
    }

    //email matter
    transporter.sendMail({
      to: "anejavanshika17@gmail.com",
      from: "anejavanshika17@gmail.com",
      subject: "Regarding Portfolio",
      html: `
      <h5>Detail Information</h5>
      <ul>
        <li><p>Name: ${name}</p></li>
        <li><p>Email: ${email}</p></li>
        <li><p>Message: ${msg}</p></li>
      </ul>
      `,
    });
    return res.status(200).send({
      success: true,
      message: "Your message Send Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};

module.exports = { sendEmailController };
