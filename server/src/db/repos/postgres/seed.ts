import bcrypt from 'bcryptjs'
import data from '../../sampleData'
import { getLastUserID, getLastActivityID } from './actions'
import UserRepo from './user_postgres_repo'
import ActivityRepo from './activity_postgres_repo'

/**
 * Array of sample Users
 * @constant {User[]} users
 */
const users: IUser[] = data.users
/**
 * Array of sample Activities
 * @constant {Activity[]} activities
 */
const activities: IActivity[] = data.activities

const registerUser = async (user: IUser) => {
    const userRepo = new UserRepo()
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw new Error(err.message)

        bcrypt.hash(user.password, salt, async (err, hash) => {
            if (err) throw new Error(err.message)

            // replace password with hash
            user.password = hash

            // save record
            await userRepo.register(user)
        })
    })
}

const seedUsers = async (): Promise<boolean> => {
    const userCount = await getLastUserID()

    if (userCount < users.length) {
        for (const user of users) {
            await registerUser(user)
        }
        return true
    } else {
        return false
    }
}

const seedActivities = async (): Promise<boolean> => {
    const activityRepo = new ActivityRepo()
    const activityCount = await getLastActivityID()

    if (activityCount < activities.length) {
        for (const activity of activities) {
            await activityRepo.create(activity)
        }
        return true
    } else {
        return false
    }
}

/**
 * Function that seed base two Users Applifting and Batman\
 * and base few images that can be monitored.
 * @async @function seed
 * @returns {Promise<void>} promise
 */
const seed = async (): Promise<void> => {
    try {
        await seedUsers()
        console.log('users have been seeded')
        await seedActivities()
        console.log('activities have been seeded')
    } catch (error) {
        throw Error(error)
    }
}

export default seed
