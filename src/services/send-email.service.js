import sgMail from '@sendgrid/mail';
import JwtService from './jwt.service';

/**
 * Class for sending user email
 */
class SendEmailService {
  /**
   * @param {email} email user email
   * @param {subject} emailSubject subject of the email
   * @param {body} emailBody description of the email
   * @returns {sendMessage} this function send an email
   */
  static sendGridEmail(email, emailSubject, emailBody) {
    sgMail.setApiKey(process.env.API_KEY);
    const msg = {
      to: `${email}`,
      from: process.env.EMAIL,
      subject: emailSubject,
      html: `${emailBody}`
    };
    const message = {
      ...msg,
      mail_settings: {
        sandbox_mode: {
          enable: process.env.NODE_ENV === 'test'
        }
      }
    };
    sgMail.send(message);
  }

  /**
   *
   *
   * @static
   * @param {item} email
   * @param {item} emailSubject
   * @param {item} emailBody
   * @param {item} token
   * @returns {SendEmailService} @memberof UserService
   */
  static sendAccVerificationLink(email) {
    const newAccountToken = JwtService.generateToken({ email });
    const emailSubject = 'Activate Your Account';
    const emailBody = `Copy the following Token: <br><strong style="color:red">${newAccountToken}</strong><br> 
    , paste it in the header of <strong style="color:green">/api/auth/account_verify<strong> route.`;
    return SendEmailService.sendGridEmail(email, emailSubject, emailBody);
  }
}

export default SendEmailService;
