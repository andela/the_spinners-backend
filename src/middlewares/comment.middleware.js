import ResponseService from '../services/response.service';
import CommentService from '../services/comment.service';

/**
 *
 *
 * @class CommentMiddleware
 */
class CommentMiddleware {
  /**
   *
   *
   * @static
   * @param {req} req
   * @param {res} res
   * @param {next} next
   * @returns {object} This function check if trip ID or comment ID exist
   * @memberof CommentMiddleware
   */
  static async checkCommentExist(req, res, next) {
    const comment = await CommentService
      .findCommentByProperty({
        id: req.params.commentId,
        userId: req.userData.id,
        subjectId: req.params.tripId
      });

    if (!comment) {
      ResponseService.setError(404, 'Comment ID does not exists or does not belong to the trip ID');
      return ResponseService.send(res);
    }
    next();
  }
}

export default CommentMiddleware;
