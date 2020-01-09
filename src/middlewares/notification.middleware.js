import PreferenceService from '../services/preference.service';
import ResponseService from '../services/response.service';

const checkIfOptionExists = async (req, res, next) => {
  const prefs = await PreferenceService.findPreference({ userId: req.userData.id });
  const { dataValues } = prefs;

  if (req.body.isInAppNotification
    && req.body.isInAppNotification.toString() === dataValues.isInAppNotification.toString()) {
    ResponseService.setSuccess(200, 'This option has been already set for this notification mode');
    return ResponseService.send(res);
  }
  if (req.body.isEmailNotification
    && req.body.isEmailNotification.toString() === dataValues.isEmailNotification.toString()) {
    ResponseService.setSuccess(200, 'This option has been already set for this notification mode');
    return ResponseService.send(res);
  }
  next();
};

export default checkIfOptionExists;
