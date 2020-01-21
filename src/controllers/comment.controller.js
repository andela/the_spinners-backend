import CommentService from '../services/comment.service';
import ResponseService from '../services/response.service';
import UserService from '../services/user.service';
import TripService from '../services/trip.service';
import emitter from '../helpers/eventEmmiters/emitter';

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
    const { dataValues } = await TripService.findTripByProperty({ id: req.params.tripId });
    const requester = await UserService.findUserByProperty({ id: dataValues.userId });

    const commentInformation = {
      userId,
      subjectId: parseInt(tripId, 10),
      subjectType: 'Trip',
      comment
    };
    const createdComment = await CommentService.createComment(commentInformation);

    if (req.userData.role === 'requester') {
      emitter.emit('comment-created', req.userData.lineManagerId, createdComment.get());
    }

    if (req.userData.role === 'manager') {
      emitter.emit('comment-created', requester.id, createdComment.get());
    }
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
