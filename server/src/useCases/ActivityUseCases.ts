import {
    GetActivityByIDController,
    GetAllActivitiesController,
    GetAllActivitiesByTypeController,
    GetLastXActivitiesController,
    CreateActivityController,
    UpdateActivityController,
    DeleteActivityController,
} from '../controllers/ActivityController'
import { ActivityRepo, UserRepo } from '../db'

/**
 * Instance of Repository Class\
 * Class that handles communication with database
 *
 * @class ActivityRepo
 * @instance
 */
const activityRepo = new ActivityRepo()
/**
 * Instance of Repository Class\
 * Class that handles communication with database
 *
 * @class UserRepo
 * @instance
 */
const userRepo = new UserRepo()

/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method GET on activity /activities/:id
 *
 * @class GetActivityByIDController
 * @instance
 */
export const getActivityByID = new GetActivityByIDController(activityRepo)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method GET on activity /activities
 *
 * @class GetAllActivitiesController
 * @instance
 */
export const getAllActivities = new GetAllActivitiesController(activityRepo)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method GET on activity /activities/:type
 *
 * @class getAllActivitiesByType
 * @instance
 */
export const getAllActivitiesByType = new GetAllActivitiesByTypeController(activityRepo)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method GET on activity /activities/:type/:amount or /activities/:amount
 *
 * @class GetLastXActivitiesController
 * @instance
 */
export const getLastXActivities = new GetLastXActivitiesController(activityRepo)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method POST on activity /activities
 *
 * @class CreateActivityController
 * @instance
 */
export const createActivity = new CreateActivityController(activityRepo, userRepo)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method PATCH on activity /activities/:id
 *
 * @class UpdateActivityController
 * @instance
 */
export const updateActivity = new UpdateActivityController(activityRepo, userRepo)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method DELETE on activity /activities/:id
 *
 * @class DeleteActivityController
 * @instance
 */
export const deleteActivity = new DeleteActivityController(activityRepo)
