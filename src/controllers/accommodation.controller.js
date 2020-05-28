import AccommodationService from '../services/accommodation.service';
import ResponseService from '../services/response.service';
import LikesService from '../services/likes.service';

/**
 *
 *
 * @class AccommodationController
 */
class AccommodationController {
  /**
           *
           *
           * @static
           * @param {req} req
           * @param {res} res
           * @returns {response} @memberof AccommodationController
           */
  static async createBooking(req, res) {
    const { dataValues } = await AccommodationService.createBooking({
      ...req.body,
      userId: req.userData.id,
      accommodationId: req.params.accommodationId,
      roomId: req.params.roomId,
      availableRooms: req.availableRooms - 1
    });
    await AccommodationService.updateRoom(
      { accommodationId: req.params.accommodationId, id: req.params.roomId },
      { availableRooms: req.availableRooms - 1 }
    );
    await AccommodationService.createAccommodationReaction({
      accommodationId: req.params.accommodationId,
      roomId: req.params.roomId,
      userId: req.userData.id
    });
    ResponseService.setSuccess(201, 'Accommodation is successfully booked', dataValues);
    return ResponseService.send(res);
  }

  /**
           *
           *
           * @static
           * @param {req} req
           * @param {res} res
           * @returns {response} @memberof AccommodationController
           */
  static async getAccommodations(req, res) {
    const accommodations = await AccommodationService.findAllAccommodations();
    const availableAccommodations = accommodations.map((accommodation) => {
      const { dataValues } = accommodation;
      return dataValues;
    });
    ResponseService.setSuccess(200, 'list of available accommodations', availableAccommodations);
    return ResponseService.send(res);
  }

  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {*} created Accomodation
   * @memberof AccommodationController
   */
  static async createAccommodation(req, res) {
    // Assign available rooms to certain type of room
    const addedAvailableRooms = req.body.rooms.map((item) => {
      const room = { ...item };
      room.availableRooms = item.numberOfRooms;
      return room;
    });
    req.body.rooms = addedAvailableRooms;

    // Get total rooms for an accommodation
    const totalRooms = req.body.rooms.map(item => item.numberOfRooms)
      .reduce((prev, next) => prev + next);

    const newAccommodation = await AccommodationService
      .createAccommodationWithInclude({ ...req.body, totalRooms, allAvailableRooms: totalRooms });

    ResponseService.setSuccess(201, 'Accommodation is successfully created', newAccommodation);
    return ResponseService.send(res);
  }

  /**
     *
     * @static
     * @param {req} req
     * @param {res} res
     * @returns {response} @memberof AccommodationController
     */
  static async updateAccommodationReaction(req, res) {
    let like = req.likeValue;
    let unlike = req.unlikeValue;
    if (like !== undefined && unlike !== undefined) {
      const { accommodationId, roomId } = req.params;
      const userId = req.userData.id;
      const reactionRecord = await LikesService.findReactionRecordByProperty({
        accommodationId, userId, roomId
      });
      const bookedRoom = await AccommodationService.findRoomByProperty(
        { id: roomId, accommodationId }
      );
      let bookedRoomLikesCounts;
      let bookedRoomDisLikesCounts;
      if (bookedRoom) {
        bookedRoomLikesCounts = bookedRoom.likesCount;
        bookedRoomDisLikesCounts = bookedRoom.dislikesCount;
      }
      if (like === true && (reactionRecord.like) === like) {
        like = !reactionRecord.like;
        await AccommodationService.updateRoom(
          {
            id: roomId,
            accommodationId
          },
          {
            likesCount: bookedRoomLikesCounts - 1
          }
        );
      }

      if (like === true && (reactionRecord.like) !== like) {
        await AccommodationService.updateRoom(
          {
            id: roomId,
            accommodationId
          },
          {
            likesCount: bookedRoomLikesCounts + 1
          }
        );
      }

      if (like !== true && (reactionRecord.like) !== like) {
        await AccommodationService.updateRoom(
          {
            id: roomId,
            accommodationId
          },
          {
            likesCount: bookedRoomLikesCounts - 1
          }
        );
      }
      if (unlike === true && (reactionRecord.unlike) === unlike) {
        unlike = !reactionRecord.unlike;
        await AccommodationService.updateRoom(
          {
            id: roomId,
            accommodationId
          },
          {
            dislikesCount: bookedRoomDisLikesCounts - 1
          }
        );
      }

      if (unlike === true && (reactionRecord.unlike) !== unlike) {
        await AccommodationService.updateRoom(
          {
            id: roomId,
            accommodationId
          },
          {
            dislikesCount: bookedRoomDisLikesCounts + 1
          }
        );
      }

      if (unlike !== true && (reactionRecord.unlike) !== unlike) {
        await AccommodationService.updateRoom(
          {
            id: roomId,
            accommodationId
          },
          {
            dislikesCount: bookedRoomDisLikesCounts - 1
          }
        );
      }
      const [, [{ dataValues }]] = await LikesService.updateALike({
        accommodationId, userId, roomId
      }, { like, unlike });
      ResponseService.setSuccess(200, 'Reaction updated successfully', dataValues);
      ResponseService.send(res);
    }
  }

  /**
 *
 *
 * @static
 * @param {req} req
 * @param {res} res
 * @returns {response} @memberof AccommodationController
 */
  static async countReactionsOnAccommodation(req, res) {
    const likesCount = await AccommodationService.findAccommodationReactionRecordByProperty({
      accommodationId: req.params.accommodationId, like: true
    });
    const unlikesCount = await AccommodationService.findAccommodationReactionRecordByProperty({
      accommodationId: req.params.accommodationId, unlike: true
    });
    ResponseService.setSuccess(200, 'Reaction records successfully retrieved', { likes: likesCount.length, dislikes: unlikesCount.length });
    ResponseService.send(res);
  }
}

export default AccommodationController;
