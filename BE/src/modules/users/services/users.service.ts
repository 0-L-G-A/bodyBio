import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserParams } from 'src/types/users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@app/entities/User';

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

    async updateUser(id: string, userDetails: UserParams){
        const updatedUser = await this.userRepository.update({id}, {...userDetails})
        return updatedUser;
    }

    async deleteUser(id: string){
        const deletedUser = await this.userRepository.delete({id})
        return deletedUser;
    }

    async signUpUser(userDetails: UserParams) {
        // Хешуємо пароль перед збереженням
        const hashedPassword = await this.hashPassword(userDetails.password);

        const newUser = this.userRepository.create({
            ...userDetails,
            password: hashedPassword,  // Зберігаємо хешований пароль
            createdAt: new Date(),
        });

        // Зберігаємо користувача в базі даних
        return this.userRepository.save(newUser);
    }

    async loginUserByEmail(email: string, password: string) {

        // Шукаємо користувача за email
        const user = await this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'name', 'surname', 'role']  // Включаємо пароль у вибірку
        });

        // Якщо користувача не існує або пароль не співпадає, повертаємо null
        if (!user) {
            return null;
        }

        const isPasswordValid = await this.comparePasswords(password, user.password);

        if (!isPasswordValid) {
            return null;
        }

        // Якщо все добре, повертаємо користувача
        return user;
    }

    // Метод для хешування пароля
    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    // Метод для порівняння паролів
    private async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

}
