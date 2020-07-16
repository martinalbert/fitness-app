import User from '../entities/User'
import Activity from '../entities/Activity'

const user1 = new User(1, 'Martin', 'info@martin.com', 'password12345')
const user2 = new User(2, 'Batman', 'batman@example.com', '12345password')

const activity1 = new Activity(1, 'crossfit', 'testing', 120, new Date(), 'ZA', user1)
const activity2 = new Activity(2, 'jogging', 'testing', 120, new Date(), 'ZA', user1)
const activity3 = new Activity(3, 'walking', 'testing', 120, new Date(), 'ZA', user1)
const activity4 = new Activity(4, 'yoga', 'testing', 120, new Date(), 'ZA', user1)

const activity5 = new Activity(5, 'workout', 'testing', 120, new Date(), 'ZA', user2)
const activity6 = new Activity(6, 'jogging', 'testing', 120, new Date(), 'ZA', user2)
const activity7 = new Activity(7, 'walking', 'testing', 120, new Date(), 'ZA', user2)
const activity8 = new Activity(8, 'crossfit', 'testing', 120, new Date(), 'ZA', user2)

export default {
    users: [user1, user2],
    activities: [
        activity1,
        activity2,
        activity3,
        activity4,
        activity5,
        activity6,
        activity7,
        activity8,
    ],
}
