import ResponseService from '../services/response.service';

const transformErrorHandler = (schema, body, res, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const { details } = error;
    const errors = details.map(({ message }) => message);
    ResponseService.setError(400, errors);
    return ResponseService.send(res);
  }
  next();
};

export default transformErrorHandler;
