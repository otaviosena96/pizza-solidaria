/* eslint-disable @typescript-eslint/no-unused-vars */
import {expect, describe, it} from 'vitest'
import RegisterUserCase from './register'

import { compare } from 'bcrypt'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-repository'
import { UserAlreadyExistsError } from './erros/users-already-exists-error'


describe('Register Use Case', () => {
    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository
        const registerUseCase = new RegisterUserCase(usersRepository)

        const email = 'otaviosena.dev@a.com'
  
        const {user} = await registerUseCase.execute({
            name: 'Otavio Sena',
            email: 'otaviosena.dev@aaa.com',
            password: '123456', 
        })

        expect(user.id).toEqual(expect.any(String))
  
    })
    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository
        const registerUseCase = new RegisterUserCase(usersRepository)
        
        const {user} = await registerUseCase.execute({
            name: 'Otavio Sena',
            email: 'otaviosena.dev@a.com',
            password: '123456', 
        })

        const isPasswordCorrectHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectHashed).toBe(true)
        
    })
    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository
        const registerUseCase = new RegisterUserCase(usersRepository)

        const email = 'otaviosena.dev@a.com'
      
        await registerUseCase.execute({
            name: 'Otavio Sena',
            email,
            password: '123456', 
        })
        await expect(() => 
            registerUseCase.execute({
                name: 'Otavio Sena',
                email,
                password: '123456', 
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError) 
      
    })
})