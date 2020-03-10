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

  /**
   * @param {number} property
   * @returns {find} this function finds comment
  */
  static findCommentByProperty(property) {
    return Comments.findOne({
      where: property
    });
  }

  /**
   * @param {object} property
   * @returns {delete} this function deletes comment
  */
  static deleteCommentByProperty(property) {
    return Comments.destroy({
      where: property,
    });
  }

  /**
   * A method to querry with condition
   * and count all records
   * @static
   * @param {object} property - The condion as an object
   * @param {number} offset - The offset to be used
   * @param {number} limit - The limit to be used
   * @returns {number} The data retrieved
   * @memberof TripService
   */
  static findByPropertyAndCountAll(property, { offset, limit }) {
    return Comments.findAndCountAll({
      where: property,
      order: [
        ['id', 'DESC']
      ],
      offset,
      limit
    });
  }
}

export default CommentService;
