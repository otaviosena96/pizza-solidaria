import express, { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { register } from './http/controllers/register'
import router from './http/routes'

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
    return response.json({message: 'Hello Dev Pizza Soliária! 🍕'})
})

app.use(router)
app.post('/users/create', register)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
        return res.status(400).json({
            message: 'Validation error.',
            issue: error.format(),
        })
    } else {
        // Erro não tratado
        return res.status(500).json({
            message: 'Internal server error.',
            error: error.message,
        })
    }
    next(error)
})


export default app
