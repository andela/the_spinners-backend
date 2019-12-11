/**
 *
 * @export
 * @class Response
 */
export default class Response {
  /**
     * Creates an instance of Response.
     * @memberof Response
     */
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  /**
     *
     * @param  {statusCode} statusCode
     * @param  {message} message
     * @param  {data} data
     * @return {error}@memberof Response
     */
  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = 'success';
  }

  /**
     *
     * @param  {statusCode} statusCode
     * @param  {message} message
     * @return {response}@memberof Response
     */
  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  /**
     *
     * @param  {res} res
     * @return
     * @return {response}@memberof Response
     */
  send(res) {
    const result = {
      status: this.type,
      message: this.message,
      data: this.data,
    };

    if (this.type === 'success') {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      status: this.statusCode,
      message: this.message,
    });
  }
}
