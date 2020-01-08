import models from '../models';

const { Comments } = models;

/**
 * class of different comments
*/
class CommentService {
  /**
   * @param {newComment} newComment
   * @returns {create} this function creates comment
  */
  static createComment(newComment) {
    return Comments.create(newComment);
  }
}

export default CommentService;
