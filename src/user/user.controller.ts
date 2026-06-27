import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')  //Decorator
export class UserController {
    constructor(private readonly userService: UserService){}  //Dependency Injection
    
    @Post()
    createUsers(){
        return this.userService.createUser();
    }

    
    @Get()
    getAllUsers(){
        return this.userService.findAll();
    }
}
