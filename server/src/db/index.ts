import loader from './loader'
import sequelize from './sequelize'

/**
 * Repository Class\
 * Entity: User\
 * Class that handles communication with database
 *
 * @class UserRepo
 * @extends IUserRepo
 * @function register - Function that creates(register) new User
 * @function login - Function that logs in user which is authenticated
 * @function getCurrent - Function that finds user that is currently loged in
 * @function getAll - Function that finds all users
 */
export const UserRepo = loader.loadRepo('user')

/**
 * Repository Class\
 * Entity: Activity\
 * Class that handles communication with database
 *
 * @class ActivityRepo
 * @extends IActivityRepo
 * @function getByID - Function that finds one activity represented by its ID
 * @function getAll - Function that finds all activities corresponding to its user
 * @function getAllByType - Function that finds all activities corresponding to its user and its type
 * @function getLastX - Function that finds last X activities corresponding to specified number
 * @function create - Function that creates new activity corresponding to activity passed in
 * @function update - Function that updates old activity corresponding to activity properties passed in
 * @function delete - Function that deletes activity represented by its ID
 */
export const ActivityRepo = loader.loadRepo('activity')

/**
 * Instance of Sequelize\
 * Represent connection to database.
 *
 * @instance of Sequelize
 */
export const postgres = sequelize
