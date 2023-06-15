/* eslint-disable @typescript-eslint/no-explicit-any */

import { UsersRepository } from '@/repositories/users-repository'

import { hash } from 'bcrypt'
import { UserAlreadyExistsError } from './erros/users-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string,
  email: string,
  password: string,
}

interface RegisterUseCaseResponse {
    user: User
}

class RegisterUserCase {
    constructor(private usersRepository:UsersRepository) {  }

    async execute({name, email, password}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse>{
    
        const password_hash = await hash(password,8)
        const userWithSameEmail = await this.usersRepository.findByEmail(email)
    
      
        if(userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }
    
    
        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        })
    
        return {
            user,
        }
    }
}

export default  RegisterUserCase
