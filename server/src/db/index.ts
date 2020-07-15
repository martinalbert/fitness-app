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
 * Instance of Sequelize\
 * Represent connection to database.
 *
 * @instance of Sequelize
 */
export const postgres = sequelize
