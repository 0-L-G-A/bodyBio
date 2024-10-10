import { UserDto } from '@app/modules/users/dtos/users.dto';
import { UsersService } from '@app/modules/users/services/users.service';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';


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

    @Put(':id')
    async updateUserById(@Param('id') id: string, @Body() updateUserDto: UserDto){
        await this.userService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    async deleteUserById(@Param('id') id: string){
        await this.userService.deleteUser(id)
    }

    @Post('signUp')
    async signUpUser(@Body() createUserDto: UserDto) {
        const newUser = await this.userService.signUpUser(createUserDto);
        return {
            statusCode: 201,
            message: 'User created successfully',
            user: newUser,
        };
    }

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
