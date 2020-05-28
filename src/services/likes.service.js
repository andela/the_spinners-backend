import models from '../models';

const { likes } = models;

/**
 *
 *
 * @class LikesService
 */
class LikesService {
  /**
       * find a like
       * @static
       * @param {object} property
       * @memberof LikesService
       * @returns {object} data
       */
  static findReactionRecordByProperty(property) {
    return likes.findOne({
      where: { ...property }
    });
  }

  /**
 * Update a like
 * @param {object} like
 * @param {object} likeInfo
 * @returns {object} updated object.
 */
  static updateALike(like, likeInfo) {
    return likes.update(likeInfo, {
      where: like,
      returning: true
    });
  }
}

export default LikesService;
