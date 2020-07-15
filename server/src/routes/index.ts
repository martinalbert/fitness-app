import express from 'express'
import multer from 'multer'
import checkAuth from '../util/checkAuth'
import { register, login, getAllUsers } from '../useCases/UserUseCases'

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

export default router
