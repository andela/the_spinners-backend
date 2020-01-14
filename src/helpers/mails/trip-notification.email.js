export const tripEmailBody = (managerNames, notification, unsubscribeUrl, data) => `<body style="margin: 0; padding: 0;">
          <table border="0" cellpadding="0" cellspacing="0" width="900px" style="padding: 0 40px 0 40px; background-color:#f1f2f3;">
            <tr><td align="center" style="background-color:#7041EE; margin: 0 50px 0 50px;">
                  <a><p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 32px; line-height: 40px;">Barefoot Nomad<p></a></td>
           </tr><tr><td align = "center" style="padding: 0 50px 0 50px;">
               <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#ffffff; padding: 0 0 0 20px;">
                <tr><td align="left" style="font-family: Arial, sans-serif; font-size: 24px; color: #050505;">
                    <p>Dear ${managerNames},</p></td></tr><tr>
                  <td align="left" style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                    <p>${notification}</p>
                  </td></tr>
                  <tr><td align="left" style="font-family: Arial, sans-serif; font-size: 18px; color: #050505;">
                      <p>With the following details:</p></td></tr>

                      <table style="font-family: arial, sans-serif; width: 70%;">
                          <tr style = "background-color: #dddddd;">
                            <td style = "border: 1px solid #dddddd; text-align: left; padding: 8px; font-weight:bold;"> From:</td>
                            <td style = "border: 1px solid #dddddd; text-align: left; padding: 8px;"> ${data.departure}</td>
                          </tr>
                          <tr>
                            <td style = "border: 1px solid #dddddd; text-align: left; padding: 8px; font-weight:bold;"> Destination:</td>
                            <td style = "border: 1px solid #dddddd; text-align: left; padding: 8px;"> ${data.destination}</td>
                          </tr>
                          <tr style = "background-color: #dddddd;">
                            <td style = "border: 1px solid #dddddd; text-align: left; padding: 8px; font-weight:bold;"> Departure date:</td>
                            <td style = "border: 1px solid #dddddd; text-align: left; padding: 8px;"> ${data.travelDate}</td>
                          </tr>
                          <tr>
                            <td style = "border: 1px solid #dddddd; text-align: left; padding: 8px; font-weight:bold;"> Travel reasons:</td>
                            <td style = "border: 1px solid #dddddd; text-align: left; padding: 8px;">${data.travelReasons}</td>
                          </tr>
                          <tr style = "background-color: #dddddd;">
                            <td style = "border: 1px solid #dddddd; text-align: left; padding: 8px; font-weight:bold;"> Accomodation:</td>
                            <td style = "border: 1px solid #dddddd; text-align: left; padding: 8px;"> ${data.accommodation}</td>
                          </tr>
                      </table>
                <tr><td align="left" style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                    <p> You are receiving this email because you subscribed to receive email from Barefoot Nomad. </p>
                    <p> contact <a href=#>support@barefoot.com</a> if you feel this is wrong</p>
                    <p>Thank you for using Bare Foot Nomad</p>
                    <p>Don't want to receive such emails from barefootNomad? <a href="${unsubscribeUrl}">Unsubscribe from email notification</a></p>
                    </td></tr></table></tr><tr>
              <td align="center" style="padding: 30px 30px 30px 30px;">&copy; BAREFOOT NOMAD, 2020<br/>
              </td></tr></table></body>`;


export const tripUpdateTemplate = (managerNames, notification, unsubscribeUrl) => `<body style="margin: 0; padding: 0;">
<table border="0" cellpadding="0" cellspacing="0" width="900px" style="padding: 0 40px 0 40px; background-color:#f1f2f3;">
  <tr><td align="center" style="background-color:#7041EE; margin: 0 50px 0 50px;">
        <a><p style="color: #ffffff; font-family: Arial, sans-serif; font-size: 32px; line-height: 40px;">Barefoot Nomad<p></a></td>
 </tr><tr><td align = "center" style="padding: 0 50px 0 50px;">
     <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#ffffff; padding: 0 0 0 20px;">
      <tr><td align="left" style="font-family: Arial, sans-serif; font-size: 24px; color: #050505;">
          <p>Dear ${managerNames},</p></td></tr><tr>
        <td align="left" style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
          <p>${notification}</p>
        </td></tr>
      <tr><td align="left" style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
          <p> You are receiving this email because you subscribed to receive email from Barefoot Nomad. </p>
          <p> contact <a href=#>support@barefoot.com</a> if you feel this is wrong</p>
          <p>Thank you for using Bare Foot Nomad</p>
          <p>Don't want to receive such emails from barefootNomad? <a href="${unsubscribeUrl}">Unsubscribe from email notification</a></p>
          </td></tr></table></tr><tr>
    <td align="center" style="padding: 30px 30px 30px 30px;">&copy; BAREFOOT NOMAD, 2020<br/>
    </td></tr></table></body>`;
