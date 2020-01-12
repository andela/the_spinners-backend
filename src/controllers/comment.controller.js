import CommentService from '../services/comment.service';
import ResponseService from '../services/response.service';

/**
 * class
*/
class CommentController {
  /**
   * @param {req} req
   * @param {res} res
   * @returns {comments} this function create comments on trip request
  */
  static async addCommentOnTripRequest(req, res) {
    const userId = req.signInUser.id;
    const { tripId, comment } = { ...req.body, ...req.params };

    const commentInformation = {
      userId,
      subjectId: parseInt(tripId, 10),
      subjectType: 'Trip',
      comment
    };
    await CommentService.createComment(commentInformation);
    ResponseService.setSuccess(201, 'Your comment was submitted successfully', commentInformation);
    return ResponseService.send(res);
  }


  /**
   *
   *
   * @static
   * @param {req} req
   * @param {req} res
   * @memberof CommentController
   * @returns {object} this function deletes comment on posted on thread
   */
  static async deleteComment(req, res) {
    await CommentService
      .deleteCommentByProperty({ id: req.params.commentId, subjectType: req.body.subjectType });
    ResponseService.setSuccess(200, 'Comment was deleted successfully');
    return ResponseService.send(res);
  }
}

export default CommentController;
