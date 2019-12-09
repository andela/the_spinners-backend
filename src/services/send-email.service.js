import sgMail from '@sendgrid/mail';

/**
 * Class for sending user email
 */
class SendEmailService {
  /**
   * @param {email} email user email
   * @param {token} token user token
   * @param {subject} emailSubject subject of the email
   * @param {body} emailBody description of the email
   * @returns {sendMessage} this function send an email
   */
  static sendGridEmail(email, token, emailSubject, emailBody) {
    sgMail.setApiKey(process.env.API_KEY);
    const msg = {
      to: `${email}`,
      from: process.env.EMAIL,
      subject: emailSubject,
      html: `${emailBody}`
    };
    sgMail.send(msg);
  }
}

export default SendEmailService;
