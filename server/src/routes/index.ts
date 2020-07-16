import express from 'express'
import multer from 'multer'
import checkAuth from '../util/checkAuth'
import { register, login, getAllUsers } from '../useCases/UserUseCases'
import {
    getActivityByID,
    getAllActivities,
    getAllActivitiesByType,
    getLastXActivities,
    createActivity,
    updateActivity,
    deleteActivity,
} from '../useCases/ActivityUseCases'

/**
 * Multer implementation of storage to store files in memoory
 * @constant storage
 */
const storage = multer.memoryStorage()

/**
 * Multer instance for processing files
 * @constant upload
 * @instance
 */
const upload = multer({
    storage: storage,
})

/**
 * Express router that creates mountable route handlers
 * @constant router
 */
const router = express.Router()

/**
 * endpoint /users
 */
router.get(
    '/users',
    checkAuth,
    async (req, res, next) => await getAllUsers.exec(req, res, next)
)
router.post('/user/register', async (req, res, next) => await register.exec(req, res, next))
router.post('/user/login', async (req, res, next) => await login.exec(req, res, next))

/**
 * endpoint /activities
 */
router.get(
    '/activities/:id',
    checkAuth,
    async (req, res, next) => await getActivityByID.exec(req, res, next)
)
router.get(
    '/activities',
    checkAuth,
    async (req, res, next) => await getAllActivities.exec(req, res, next)
)
router.get(
    '/activities/type/:type',
    checkAuth,
    async (req, res, next) => await getAllActivitiesByType.exec(req, res, next)
)
router.get(
    '/activities/len/:type/:amount',
    checkAuth,
    async (req, res, next) => await getLastXActivities.exec(req, res, next)
)
router.get(
    '/activities/len/:amount',
    checkAuth,
    async (req, res, next) => await getLastXActivities.exec(req, res, next)
)
router.post(
    '/activities',
    checkAuth,
    async (req, res, next) => await createActivity.exec(req, res, next)
)
router.patch(
    '/activities/:id',
    checkAuth,
    async (req, res, next) => await updateActivity.exec(req, res, next)
)
router.delete(
    '/activities/:id',
    checkAuth,
    async (req, res, next) => await deleteActivity.exec(req, res, next)
)

export default router
