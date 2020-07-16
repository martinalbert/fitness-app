import Sequelize, { Model } from 'sequelize'
import sequelize from '../../../sequelize'
import UserModel from './User'

/**
 * Sequelize Model Class\
 * Entity: Activity\
 * Represent table in database
 *
 * @class ActivityModel
 * @extends Model
 */
class ActivityModel extends Model {}
ActivityModel.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true,
        },
        type: {
            type: Sequelize.ENUM('jogging', 'walking', 'crossfit', 'workout', 'yoga'),
            allowNull: false,
            validate: {
                isLowercase: true,
            },
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        duration: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
            },
        },
        dateTime: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                isDate: true,
            },
        },
        location: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                len: [2, 50],
            },
        },
        user: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: UserModel,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'activity',
    }
)

export default ActivityModel
