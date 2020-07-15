import User from '../entities/User'

const user1 = new User(1, 'Martin', 'info@martin.com', 'password12345')
const user2 = new User(2, 'Batman', 'batman@example.com', '12345password')

export default {
    users: [user1, user2],
}
