/**
 * Abstract Class\
 * Contains abstractions of all functions that communicate with database
 *
 * @abstract @class IActivityRepo
 * @function getByID - Function that finds one activity represented by its ID
 * @function getAll - Function that finds all activities corresponding to its user
 * @function getAllByType - Function that finds all activities corresponding to its user and its type
 * @function getLastX - Function that finds last X activities corresponding to specified number
 * @function create - Function that creates new activity corresponding to activity passed in
 * @function update - Function that updates old activity corresponding to activity properties passed in
 * @function delete - Function that deletes activity represented by its ID
 */
export default abstract class IActivityRepo {
    /**
     * Function that finds one activity represented by its its ID
     * @abstract @async @function getByID
     * @param {number} id - ID of Activity
     * @param {number} uID - ID of User
     * @returns {Promise<Activity>} found Activity
     */
    abstract async getByID(id: number, uID: number): Promise<IActivity>
    /**
     * Function that finds all activities corresponding to its user
     * @abstract @async @function getAll
     * @param {number} uID - ID of User
     * @returns {Promise<Activity[]>} found Activitys
     */
    abstract async getAll(uID: number): Promise<IActivity[]>
    /**
     * Function that finds all activities corresponding to its user and its type
     * @abstract @async @function getAllByType
     * @param {number} uID - ID of User
     * @param {ActivityType} type - Activity type
     * @returns {Promise<Activity[]>} found Activitys
     */
    abstract async getAllByType(uID: number, type: ActivityType): Promise<IActivity[]>
    /**
     * Function that finds last X activities corresponding to specified number and type
     * @abstract @async @function getLastX
     * @param {number} uID - ID of User
     * @param {number} amount - Number specifying amount of results
     * @param {ActivityType} type - (optional) Activity type
     * @returns {Promise<Activity[]>} found Activitys
     */
    abstract async getLastX(
        uID: number,
        amount: number,
        type?: ActivityType
    ): Promise<IActivity[]>
    /**
     * Function that creates new activity corresponding to activity passed in
     * @abstract @async @function create
     * @param {Activity} activity - activity that is going to be created
     * @returns {Promise<Activity>} created Activity
     */
    abstract async create(activity: IActivity): Promise<IActivity>
    /**
     * Function that updates old activity corresponding to activity properties passed in
     * @abstract @async @function update
     * @param {number} id - ID of Activity
     * @param {number} uID - ID of User
     * @param {any} properties - properties of activity that are going to be updated
     * @returns {Promise<boolean>} value that indicates whether activity was updated or not
     */
    abstract async update(id: number, uID: number, properties: any): Promise<boolean>
    /**
     * Function that deletes activity represented by its ID
     * @abstract @async @function delete
     * @param {number} id - ID of Activity
     * @param {number} uID - ID of User
     * @returns {Promise<boolean>} value that indicates whether activity was deleted or not
     */
    abstract async delete(id: number, uID: number): Promise<boolean>
}
