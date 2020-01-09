import Joi from '@hapi/joi';
import transformErrorHandler from '../helpers/transformErrorHandler';

const notificationSchema = Joi.object().keys({
  isEmailNotification: Joi.string()
    .valid('true', 'false')
    .messages({
      'any.only': 'Email Notification value must be one of [true, false]',
    }),
  isInAppNotification: Joi.string()
    .valid('true', 'false')
    .messages({
      'any.only': 'In-App Notification value must be one of [true, false]',
    }),
}).xor('isEmailNotification', 'isInAppNotification')
  .messages({ 'object.xor': 'You can set one notification mode at a time.' })
  .options({ abortEarly: false });

const validateNotification = (req, res, next) => {
  transformErrorHandler(notificationSchema, req.body, res, next);
};

export default validateNotification;
