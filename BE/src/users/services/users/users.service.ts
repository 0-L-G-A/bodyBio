import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { UserParams } from 'src/types/users';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    fetchUsers(){
        return this.userRepository.find()
    }

    async fetchUserById(id: string){
        const user = await this.userRepository.findOneBy({ id })
        return user;
    }

    createUser(userDetails: UserParams){
        const newUser = this.userRepository.create({ ...userDetails, createdAt: new Date() })
        return this.userRepository.save(newUser) //here promise is returned
    }

    async updateUser(id: string, userDetails: UserParams){
        const updatedUser = await this.userRepository.update({id}, {...userDetails})
        return updatedUser;
    }

    async deleteUser(id: string){
        const deletedUser = await this.userRepository.delete({id})
        return deletedUser;
    }

    // async loginUserByEmail(email: string, password: string){
    //     const user = await this.userRepository.findOneBy({ email, password })
    //     return user;
    // }

    async loginUserByEmail(email: string, password: string) {
        // Шукаємо користувача за email
        const user = await this.userRepository.findOneBy({ email });
    
        // Якщо користувача не існує або пароль не співпадає, повертаємо null
        if (!user || user.password !== password) {
          return null;
        }
    
        // Якщо все добре, повертаємо користувача
        return user;
    }

}
