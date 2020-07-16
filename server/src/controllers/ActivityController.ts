import { Request, Response, NextFunction } from 'express'
import { BaseController } from './BaseController'
import IActivityRepo from '../db/repos/IActivityRepo'
import IUserRepo from '../db/repos/IUserRepo'
import Activity from '../entities/Activity'

/**
 * Controller Class\
 * Entity: Activity\
 * Controller that handles HTTP Requests with method GET on endpoint /activities/:id
 *
 * @class GetActivityByIDController
 * @extends BaseController
 * @param  {IActivityRepo} repo - Database repository of Activities
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class GetActivityByIDController extends BaseController {
    /**
     * @private Database repository of Activities
     */
    private repo: IActivityRepo

    /**
     * @constructor of GetActivityByIDController
     * @param  {IActivityRepo} activityRepo - Abstraction of database repository for Activities
     * @returns {GetActivityByIDController} instance of this class
     */
    constructor(activityRepo: IActivityRepo) {
        super()
        this.repo = activityRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        console.log('getting Activity by ID')
        // handle request
        try {
            const ID = Number(req.params.id)
            const uID = req.user.id
            const activity = await this.repo.getByID(ID, uID)

            this.ok<IActivity>(res, activity)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: Activity\
 * Controller that handles HTTP Requests with method GET on endpoint /activities
 *
 * @class GetAllActivitiesController
 * @extends BaseController
 * @param  {IActivityRepo} repo - Database repository of Activities
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class GetAllActivitiesController extends BaseController {
    /**
     * @private Database repository of Activities
     */
    private repo: IActivityRepo

    /**
     * @constructor of GetAllActivitiesController
     * @param  {IActivityRepo} activityRepo - Abstraction of database repository for Activities
     * @returns {GetAllActivitiesController} instance of this class
     */
    constructor(activityRepo: IActivityRepo) {
        super()
        this.repo = activityRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        console.log('getting all Activities for logged User')
        // handle request
        try {
            const all = await this.repo.getAll(req.user.id)
            this.ok<IActivity[]>(res, all)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: Activity\
 * Controller that handles HTTP Requests with method GET on endpoint /activities/:type
 *
 * @class GetAllActivitiesByTypeController
 * @extends BaseController
 * @param  {IActivityRepo} repo - Database repository of Activities
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class GetAllActivitiesByTypeController extends BaseController {
    /**
     * @private Database repository of Activities
     */
    private repo: IActivityRepo

    /**
     * @constructor of GetAllActivitiesByTypeController
     * @param  {IActivityRepo} activityRepo - Abstraction of database repository for Activities
     * @returns {GetAllActivitiesByTypeController} instance of this class
     */
    constructor(activityRepo: IActivityRepo) {
        super()
        this.repo = activityRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        console.log('getting all Activities for logged User and specified type')
        // handle request
        try {
            const type = <ActivityType>req.params.type
            const all = await this.repo.getAllByType(req.user.id, type)
            this.ok<IActivity[]>(res, all)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: Activity\
 * Controller that handles HTTP Requests with method GET on endpoint /activities/:type/:amount or /activities/:amount
 *
 * @class GetLastXActivitiesController
 * @extends BaseController
 * @param  {IActivityRepo} repo - Database repository of Activities
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class GetLastXActivitiesController extends BaseController {
    /**
     * @private Database repository of Activities
     */
    private repo: IActivityRepo

    /**
     * @constructor of GetLastXActivitiesController
     * @param  {IActivityRepo} activityRepo - Abstraction of database repository for Activities
     * @returns {GetLastXActivitiesController} instance of this class
     */
    constructor(activityRepo: IActivityRepo) {
        super()
        this.repo = activityRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        console.log('getting last X Activities for logged User and specified amount')
        // handle request
        try {
            const type = <ActivityType>req.params.type
            const amount = Number(req.params.amount)

            let all
            if (type) {
                all = await this.repo.getLastX(req.user.id, amount, type)
            } else {
                all = await this.repo.getLastX(req.user.id, amount)
            }

            this.ok<IActivity[]>(res, all)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: Activity\
 * Controller that handles HTTP Requests with method POST on endpoint /activities
 *
 * @class CreateActivityController
 * @extends BaseController
 * @param  {IActivityRepo} repo - Database repository of Activities
 * @param  {IUserRepo} userRepo - Database repository of Users
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class CreateActivityController extends BaseController {
    /**
     * @private Database repository of Activities
     */
    private repo: IActivityRepo

    /**
     * @private Database repository of Users
     */
    private userRepo: IUserRepo

    /**
     * @constructor of CreateActivityController
     * @param  {IActivityRepo} activityRepo - Abstraction of database repository for Activities
     * @param  {IUserRepo} userRepo - Abstraction of database repository for Users
     * @returns {CreateActivityController} instance of this class
     */
    constructor(activityRepo: IActivityRepo, userRepo: IUserRepo) {
        super()
        this.repo = activityRepo
        this.userRepo = userRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        let user: IUser
        console.log('creating new Activity')

        // get user
        try {
            const { id, email } = req.user
            user = await this.userRepo.getCurrent(id, email)
        } catch (error) {
            return this.unauthorized(next, error)
        }

        let description: string | undefined, location: string | undefined
        // parse the Activity
        try {
            // get description and location from request body
            description = undefined
            location = undefined
            if (req.body.description) description = req.body.description
            if (req.body.location) location = req.body.location
        } catch (err) {
            return this.invalidContent(next, err)
        }

        // create new Activity
        try {
            const { type, duration, dateTime } = req.body
            const activity = new Activity(
                0,
                type,
                description,
                duration,
                dateTime,
                location,
                user
            )

            // save record
            const newActivity = await this.repo.create(activity)
            this.created<IActivity>(res, newActivity)
        } catch (err) {
            return this.fail(next, err.toString())
        }
    }
}

/**
 * Controller Class\
 * Entity: Activity\
 * Controller that handles HTTP Requests with method PUT on endpoint /activities/:id
 *
 * @class UpdateActivityController
 * @extends BaseController
 * @param  {IActivityRepo} activityRepo - Abstraction of database repository for Activities
 * @param  {IUserRepo} userRepo - Abstraction of database repository for Users
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class UpdateActivityController extends BaseController {
    /**
     * @private Database repository of Activities
     */
    private repo: IActivityRepo

    /**
     * @private Database repository of Users
     */
    private userRepo: IUserRepo

    /**
     * @constructor of UpdateActivityController
     * @param  {IActivityRepo} activityRepo - Abstraction of database repository for Activities
     * @param  {IUserRepo} userRepo - Abstraction of database repository for Users
     * @returns {UpdateActivityController} instance of this class
     */
    constructor(activityRepo: IActivityRepo, userRepo: IUserRepo) {
        super()
        this.repo = activityRepo
        this.userRepo = userRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        // check for JSON
        if (!req.is('application/json')) return this.invalidContent(next)

        let user: IUser
        try {
            // handle request
            const { id, email } = req.user
            user = await this.userRepo.getCurrent(id, email)
        } catch (error) {
            return this.unauthorized(next, error)
        }
        try {
            // update record
            console.log('updating old activity')
            const ID = Number(req.params.id)
            const updated = await this.repo.update(ID, user.id, req.body)

            this.ok<boolean>(res, updated)
        } catch (err) {
            return this.fail(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: Activity\
 * Controller that handles HTTP Requests with method DELETE on endpoint /activities/:id
 *
 * @class DeleteActivityController
 * @extends BaseController
 * @param  {IActivityRepo} repo - Database repository of Activities
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class DeleteActivityController extends BaseController {
    /**
     * @private Database repository of Activities
     */
    private repo: IActivityRepo

    /**
     * @constructor of DeleteActivityController
     * @param  {IActivityRepo} activityRepo - Abstraction of database repository for Activities
     * @returns {DeleteActivityController} instance of this class
     */
    constructor(activityRepo: IActivityRepo) {
        super()
        this.repo = activityRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        console.log('Deleting Activity')
        const ID = Number(req.params.id)
        const uID = req.user.id

        // find activity that will be deleted
        try {
            await this.repo.getByID(ID, uID)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }

        // delete Activity
        try {
            const deleted = await this.repo.delete(ID, uID)
            this.ok<Boolean>(res, deleted)
        } catch (err) {
            return this.fail(next, err)
        }
    }
}
