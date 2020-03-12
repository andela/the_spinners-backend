import CommentService from '../services/comment.service';
import ResponseService from '../services/response.service';
import { paginationHelper } from '../helpers';

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
    ResponseService.setSuccess(201, 'Your comment was submitted successfully', {
      ...commentInformation,
      User: {
        firstName: req.signInUser.firstName,
        lastName: req.signInUser.lastName
      }
    });
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

  /**
   *
   *
   * @static
   * @param {req} req
   * @param {res} res
   * @returns {object} This function returns list of comments posted on thread
   * @memberof CommentController
   */
  static async viewCommentPostedOnTripRequest(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const results = await CommentService
      .findByPropertyAndCountAll(
        {
          // userId: req.userData.id,
          subjectId: req.params.tripId
        },
        {
          offset,
          limit
        }
      );
    ResponseService.setSuccess(200, 'List all comments', {
      pageMeta: paginationHelper({
        count: results.count, rows: results.rows, offset, limit
      }),
      rows: results.rows
    });
    return ResponseService.send(res);
  }
}

export default CommentController;
