import models from '../models';

const { Preferences } = models;

/**
 * @class PreferenceService
 */
export default class PreferenceService {
  /**
   * @static
   * @param {*} preference
   * @memberof NotificationService
   * @return {notification} new notification
   */
  static async createPreference(preference) {
    return Preferences.create(preference);
  }

  /**
   * @static
   * @param {*} property
   * @memberof PreferenceService
   * @return {notification} preferences
   */
  static findPreference(property) {
    return Preferences.findOne({
      where: property
    });
  }

  /**
   *
   *
   * @static
   * @param {item} user user column to be updated
   * @param {value} userInfo to be updated
   * @returns {updated} @memberof UserService
   */
  static updatePreference(user, userInfo) {
    return Preferences.update(userInfo, {
      where: user
    });
  }
}
