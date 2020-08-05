/**
 * Interface\
 * Interface for Entity of User
 *
 * @interface
 * @param  {number} id - Primary key of DB record
 * @param  {string} userName - Name of User
 * @param  {string} email - Email of User
 * @param  {string} password - password
 * @function toObject - Function that maps the user to object
 */
interface IUser {
    /**
     * Primary key of DB record
     */
    id: number
    /**
     * Name of User
     */
    userName?: string
    /**
     * Email of User
     */
    email: string
    /**
     * Password
     */
    password: string

    /**
     * Helper Function \
     * function that maps the user to object
     * @function toObject
     * @returns {Object} object with properties of user
     */
    toObject(): UserObject
}

interface UserObject {
    id?: number
    userName?: string
    email: string
    password: string
}

/**
 * Activity type for Entity Activity
 */
type ActivityType = 'jogging' | 'walking' | 'crossfit' | 'workout' | 'yoga'

/**
 * Interface\
 * Interface for Entity of Activity
 *
 * @interface
 * @param  {number} id - primary key of db record
 * @param  {ActivityType} type - activity type
 * @param  {string} description - (optional) description of activity
 * @param  {number} duration - duration of activity
 * @param  {Date} dateTime - date and time when activity was performed
 * @param  {string} location - (optional) location where activity was performed
 * @function toObject - function that maps the Activity to object
 */
interface IActivity {
    /**
     * Primary key of DB record
     */
    id: number
    /**
     * Activity type
     */
    type: ActivityType
    /**
     * (optional) Description of activity
     */
    description?: string
    /**
     * Duration of activity
     */
    duration: number
    /**
     * Date and time when activity was performed
     */
    dateTime: Date
    /**
     * (optional) Location where activity was performed
     */
    location?: string
    /**
     * User that created this Activity
     */
    user: User

    /**
     * Helper Function \
     * function that maps the user to object
     * @function toObject
     * @returns {Object} object with properties of user
     */
    toObject(): ActivityObject
}

interface ActivityObject {
    id?: number
    type: ActivityType
    description?: string
    duration: number
    dateTime: Date
    location?: string
    user: number
}

/**
 * Interface\
 * Interface for Object that is decoded by valid json web token
 *
 * @interface
 * @param  {number} id - id of encoded User
 * @param  {string} email - email of encoded User
 * @param  {number} iat - issued at - time at which the JWT was created
 * @param  {number} exp - expiration time - time on which JWT won't be accepted
 */
interface jwtObject {
    /**
     * id of encoded User
     */
    id?: number
    /**
     * email of encoded User
     */
    email?: string
    user?: string
    /**
     * issued at - time at which the JWT was created
     */
    iat: number
    /**
     * expiration time - time on which JWT won't be accepted
     */
    exp: number
}
