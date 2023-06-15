/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/erros/users-already-exists-error'
import RegisterUserCase from '@/use-cases/register'
import { z } from 'zod'

export async function register(req: Request, res: Response) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    try {
        const { name, email, password } = registerBodySchema.parse(req.body)

        const usersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUserCase(usersRepository)

        await registerUseCase.execute({
            name,
            email,
            password,
        })

        return res.status(201).json({
            message: 'Usuário cadastrado com sucesso',
        })
    } catch (err: any) {
        if (err instanceof UserAlreadyExistsError) {
            return res.status(409).json({
                message: err.message,
            })
        } else if (err instanceof z.ZodError) {
            const validationError = err.errors.map((error) => ({
                code: error.code,
                message: error.message,
                path: error.path,
            }))

            return res.status(400).json({
                message: 'Erro de validação',
                validationError,
            })
        } else {
            return res.status(500).json({
                message: 'Erro interno do servidor',
                error: err.message,
            })
        }
    }
}
