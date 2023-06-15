import { Router } from 'express'
import { register } from '@/http/controllers/register'

const router = Router()

router.post('/users/create', register)

export default router
