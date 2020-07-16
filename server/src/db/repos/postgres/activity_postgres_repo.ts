import IActivityRepo from '../IActivityRepo'
import { resetSequence } from './actions'
import ActivityModel from './models/Activity'

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
export default class ActivityRepo extends IActivityRepo {
    /**
     * Function that finds one activity represented by its its ID
     * @abstract @async @function getByID
     * @param {number} id - ID of Activity
     * @param {number} uID - ID of User
     * @returns {Promise<Activity>} found Activity
     */
    async getByID(id: number, uID: number): Promise<IActivity> {
        const activity = await ActivityModel.findOne({
            where: { id: id, user: uID },
        })
        if (!activity) {
            throw new Error('This User doesnt have access to this activity')
        }

        if (activity) return activity

        throw new Error(`There is no activity with id: ${id} for this User.`)
    }

    /**
     * Function that finds all activities corresponding to its user
     * @abstract @async @function getAll
     * @param {number} uID - ID of User
     * @returns {Promise<Activity[]>} found Activitys
     */
    async getAll(uID: number): Promise<IActivity[]> {
        const activities = await ActivityModel.findAll({
            where: { user: uID },
        })

        if (activities) return activities

        throw new Error('There are no activities for this User')
    }

    /**
     * Function that finds all activities corresponding to its user and its type
     * @abstract @async @function getAllByType
     * @param {number} uID - ID of User
     * @param {ActivityType} type - Activity type
     * @returns {Promise<Activity[]>} found Activitys
     */
    async getAllByType(uID: number, type: ActivityType): Promise<IActivity[]> {
        const activities = await ActivityModel.findAll({
            where: { user: uID, type: type },
        })

        if (activities) return activities

        throw new Error('There are no activities for this User')
    }

    /**
     * Function that finds last X activities corresponding to specified number and type
     * @abstract @async @function getLastX
     * @param {number} uID - ID of User
     * @param {number} amount - Number specifying amount of results
     * @param {ActivityType} type - (optional) Activity type
     * @returns {Promise<Activity[]>} found Activitys
     */
    async getLastX(uID: number, amount: number, type?: ActivityType): Promise<IActivity[]> {
        let activities
        if (type)
            activities = await ActivityModel.findAll({
                where: { user: uID, type: type },
                order: [['id', 'DESC']],
                limit: amount,
            })
        else
            activities = await ActivityModel.findAll({
                where: { user: uID },
                order: [['id', 'DESC']],
                limit: amount,
            })

        if (activities) return activities

        throw new Error('There are no activities for this User')
    }

    /**
     * Function that creates new activity corresponding to activity passed in
     * @abstract @async @function create
     * @param {Activity} activity - activity that is going to be created
     * @returns {Promise<Activity>} created Activity
     */
    async create(activity: IActivity): Promise<IActivity> {
        const newActivity = await ActivityModel.create(activity.toObject())

        // reset postgres sequence
        await resetSequence('activities')

        if (newActivity) return newActivity

        throw new Error('Creating new activity failed.')
    }

    /**
     * Function that updates old activity corresponding to activity properties passed in
     * @abstract @async @function update
     * @param {number} id - ID of Activity
     * @param {number} uID - ID of User
     * @param {any} properties - properties of activity that are going to be updated
     * @returns {Promise<boolean>} value that indicates whether activity was updated or not
     */
    async update(id: number, uID: number, properties: any): Promise<boolean> {
        const activity = await ActivityModel.findOne({
            where: { id: id, user: uID },
        })

        if (activity) {
            return await activity.update(properties)
        }

        throw new Error(`There is no activity with id: ${id} for this User`)
    }

    /**
     * Function that deletes activity represented by its ID
     * @abstract @async @function delete
     * @param {number} id - ID of Activity
     * @param {number} uID - ID of User
     * @returns {Promise<boolean>} value that indicates whether activity was deleted or not
     */
    async delete(id: number, uID: number): Promise<boolean> {
        const activity = await ActivityModel.findOne({
            where: { id: id, user: uID },
        })
        if (!activity) {
            throw new Error('This User doesnt have access to this activity')
        }

        if (activity.dataValues) {
            const deleted = await ActivityModel.destroy({
                where: {
                    id: id,
                    user: uID,
                },
            })

            // reset postgres sequence
            await resetSequence('activities')

            return deleted
        }

        throw new Error(`There is no activity with id: ${id} for this User`)
    }
}
