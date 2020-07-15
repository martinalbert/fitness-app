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
     * function that maps the user to bbject
     * @function toObject
     * @returns {Object} object with properties of user
     */
    toObject(): Object
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
    id: number
    /**
     * email of encoded User
     */
    email: string
    /**
     * issued at - time at which the JWT was created
     */
    iat: number
    /**
     * expiration time - time on which JWT won't be accepted
     */
    exp: number
}
