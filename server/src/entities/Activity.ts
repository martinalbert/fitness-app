/**
 * Entity Class\
 * class that represent entity of Activity across application
 *
 * @class User
 * @implements {IUser}
 * @param  {number} id - primary key of db record
 * @param  {ActivityType} type - activity type
 * @param  {string} description - (optional) description of activity
 * @param  {number} duration - duration of activity
 * @param  {Date} dateTime - date and time when activity was performed
 * @param  {string} location - (optional) location where activity was performed
 * @function toObject - function that maps the Activity to object
 */
export default class Activity implements IActivity {
    id: number
    type: ActivityType
    description?: string
    duration: number
    dateTime: Date
    location?: string
    user: IUser

    constructor(
        id: number,
        type: ActivityType,
        description: string | undefined,
        duration: number,
        dateTime: Date,
        location: string | undefined,
        user: IUser
    ) {
        this.id = id
        this.type = type
        this.description = description
        this.duration = duration
        this.dateTime = dateTime
        this.location = location
        this.user = user
    }

    /**
     * Helper Function \
     * function that maps the user to object
     * @function toObject
     * @returns {Object} object with properties of user
     */
    toObject(): Object {
        return {
            id: this.id,
            type: this.type,
            description: this.description,
            duration: this.duration,
            dateTime: this.dateTime,
            location: this.location,
            user: this.user.id,
        }
    }
}
