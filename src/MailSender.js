/* eslint-disable max-len */
const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, playlistName, content) {
    const message = {
      from: `'Open Music Apps "${process.env.MAIL_ADDRESS}"'`,
      to: targetEmail,
      subject: `Playlist "${playlistName}" Export`,
      text: `Dear Open Music customer, 
      Please find the requested playlist "${playlistName}" export in the attachment. 
      Cheers!`,
      html: `Dear Open Music customer, <br><br> 
      Please find the requested playlist "${playlistName}" export in the attachment.<br>
      Cheers!`,
      attachments: [
        {
          filename: `Playlist ${playlistName}.json`,
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
