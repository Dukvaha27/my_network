const nodemailer = require("nodemailer");

class MailServices {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `account activation for ${process.env.API_URL}`,
      text: "",
      html: `
          <div>
            <h1>To activate follow the link</h1>
            <a href="${link}">${link}</a>
          </div>
        `,
    });
  }

  async sendNewPasswordToMail(to, password) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `New password ${process.env.API_URL}`,
      text: "",
      html: `
          <div>
            <h3>Your new password.
            Please don't anyone report</h3>
            <p>${password}</p>
          </div>
        `,
    });
  }
}

module.exports = new MailServices();
