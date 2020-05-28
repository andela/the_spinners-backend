import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import transformErrorHandler from '../helpers/transformErrorHandler';
import ResponseService from '../services/response.service';

const Joi = joiBase.extend(joiDate);

export const bookAccommodationValidation = async (req, res, next) => {
  const schema = Joi.object({
    accommodationId: Joi.number(),
    roomId: Joi.number(),
    from: Joi.date().greater('now').utc().format('YYYY-MM-DD')
      .required()
      .messages({
        'date.greater': 'Staying from date must not be in the past',
        'date.format': 'Staying from date must have format YYYY-MM-DD',
        'any.required': 'Staying from date is required'
      }),
    to: Joi.date().greater(Joi.ref('from')).utc().format('YYYY-MM-DD')
      .required()
      .messages({
        'date.greater': 'check-out date must be greater than check-in date',
        'date.format': 'Staying to date must have format YYYY-MM-DD',
        'any.required': 'Staying to date is required'
      })
  }).options({ abortEarly: false });

  const results = schema.validate({ ...req.body, ...req.params });
  if (results.error) {
    const errorMessages = results.error.details.map((error) => error.message.replace(/[^a-zA-Z0-9 .-]/g, ''));
    ResponseService.setError(400, errorMessages);
    return ResponseService.send(res);
  }
  next();
};

export const createAccommodationValidations = async (req, res, next) => {
  const createAccommodationSchema = Joi.object({
    name: Joi.string()
      .regex(/^[a-zA-Z ]+$/)
      .required()
      .messages({
        'string.base': 'Invalid type, name must be a string',
        'string.empty': 'Please enter your accomodation name',
        'string.pattern.base': 'name must contain only letters',
        'any.required': 'name is required'
      }),
    description: Joi.string()
      .required()
      .messages({
        'string.base': 'Invalid type, description must be a string',
        'string.empty': 'Please enter your accomodation description',
        'any.required': 'description is required'
      }),
    rating: Joi.number()
      .max(5)
      .required()
      .messages({
        'number.max': 'rating must be less than or equal to 5',
        'any.required': 'rating is required'
      }),
    typeId: Joi.number()
      .min(1)
      .required()
      .messages({
        'number.base': 'Invalid type, Type Id must be a number',
        'number.min': 'Please type id must be from 1 and above',
        'any.required': 'Type Id is required'
      }),
    locationId: Joi.number()
      .min(1)
      .required()
      .messages({
        'number.base': 'Invalid type, Location id must be a number',
        'number.min': 'Please location id must be from 1 and above',
        'any.required': 'Type Id is required'
      }),
    amenities: Joi.array().items(Joi.object({
      amenity: Joi.string()
        .required()
        .messages({
          'string.base': 'amenity must be a string',
          'string.empty': 'Please enter amenity',
          'any.required': 'amenity is required'
        })
    }).options({ abortEarly: false })).min(1).required(),
    accommodationPictures: Joi.array().items(Joi.object({
      imageUrl: Joi.string()
        .required()
        .messages({
          'string.base': 'image url must be a string',
          'string.empty': 'Please enter image url',
          'any.required': 'image url is required'
        }),
      subjectType: Joi.string()
        .required()
        .messages({
          'string.base': 'subject type must be a string',
          'string.empty': 'Please enter subject type',
          'any.required': 'subject type is required'
        })
    }).options({ abortEarly: false })).min(1).required(),
    addOnServices: Joi.array().items(Joi.object({
      serviceName: Joi.string()
        .regex(/^[a-zA-Z ]+$/)
        .required()
        .messages({
          'string.base': 'service name must be a string',
          'string.empty': 'Please enter your add on service name ',
          'string.pattern.base': 'service name type must contain only letters',
          'any.required': 'service name is required'
        }),
      price: Joi.number()
        .min(1)
        .required()
        .messages({
          'number.base': 'Invalid type, price must be a number',
          'number.min': 'price should be from 1 and above',
          'any.required': 'price is required'
        }),
      description: Joi.string()
        .required()
        .messages({
          'string.base': 'description must be a string',
          'string.empty': 'Please enter your add on description ',
          'string.pattern.base': 'description type must contain only letters',
          'any.required': 'description is required'
        }),
    }).options({ abortEarly: false })),
    rooms: Joi.array().items(Joi.object({
      roomType: Joi.string()
        .regex(/^[a-zA-Z ]+$/)
        .required()
        .messages({
          'string.base': 'Room type must be a string',
          'string.empty': 'Please enter your room type',
          'string.pattern.base': 'Room type must contain only letters',
          'any.required': 'Room name is required'
        }),
      numberOfPeople: Joi.number()
        .min(1)
        .required()
        .messages({
          'number.base': 'Invalid type, Number of people must be a number',
          'number.min': 'Please number Of People should be from 1 and above',
          'any.required': 'number of people is required'
        }),
      roomPrice: Joi.number()
        .min(1)
        .required()
        .messages({
          'number.base': 'Invalid type, room price must be a number',
          'number.min': 'Please room price should be from 1 and above',
          'any.required': 'room price is required'
        }),
      roomPictures: Joi.array().items(Joi.object({
        imageUrl: Joi.string()
          .required()
          .messages({
            'string.base': 'image url must be a string',
            'string.empty': 'Please enter image url',
            'any.required': 'image url is required'
          }),
        subjectType: Joi.string()
          .required()
          .messages({
            'string.base': 'subject type must be a string',
            'string.empty': 'Please enter subject type',
            'any.required': 'subject type is required'
          })
      }).options({ abortEarly: false })).min(1).required(),
      numberOfRooms: Joi.number()
        .min(1)
        .required()
        .messages({
          'number.base': 'Invalid type,number of rooms number must be a number',
          'number.min': 'number of rooms should be from 1 and above',
          'any.required': 'number of room number is required'
        }),
    }).options({ abortEarly: false })).min(1).required()
  }).options({ abortEarly: false });

  transformErrorHandler(createAccommodationSchema, req.body, res, next);
};

const likeAndUnlikeAccommodationSchema = Joi.object({
  like: Joi.boolean()
    .valid('yes', 'no')
    .required()
    .messages({
      'string.base': 'Invalid type, likeValue must be a string',
      'string.empty': 'Please enter likeValue',
      'any.required': 'likeValue is required'
    }),
  unlike: Joi.boolean()
    .valid('yes', 'no')
    .required()
    .messages({
      'string.base': 'Invalid type, dislikeValue must be a string',
      'string.empty': 'Please enter dislikeValue',
      'any.required': 'dislikeValue is required'
    })
}).options({ abortEarly: false });

const validateHandler = (schema, body, res, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const { details } = error;
    const errors = details.map(({ message }) => (message.replace(/[^a-zA-Z0-9 .-]/g, '')));
    ResponseService.setError(400, errors);
    return ResponseService.send(res);
  }
  next();
};

export const validateAccommodationReaction = (req, res, next) => {
  validateHandler(likeAndUnlikeAccommodationSchema, req.body, res, next);
};
