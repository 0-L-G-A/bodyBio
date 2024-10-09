import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}
    @Get()
    async getUsers(){
        const users = await this.userService.fetchUsers()
        return users
    }

    @Get(':id')
    async getUserById(@Param('id') id: string){
        const user = await this.userService.fetchUserById(id)
        return user
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        this.userService.createUser(createUserDto)
    }

    @Put(':id')
    async updateUserById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
        await this.userService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    async deleteUserById(@Param('id') id: string){
        await this.userService.deleteUser(id)
    }

    // @Get(':email')
    // async loginUserByEmail(@Param('email') email: string){
    //     const user = await this.userService.loginUserByEmail(email)
    //     return user
    // }

    @Post('login')
    async loginUserByEmail(@Body('email') email: string, @Body('password') password: string) {
        const user = await this.userService.loginUserByEmail(email, password);
        
        if (!user) {
        // Якщо користувач не знайдений або пароль невірний
        throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
        }
        
        // Якщо логін успішний, повертаємо користувача або токен
        return {
        statusCode: 200,
        message: 'Login successful',
        user,
        };
    }

}
