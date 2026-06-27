import { Controller, Get, Post } from '@nestjs/common';
import { User2Service } from './user2.service';

@Controller('user2')
export class User2Controller {
    constructor(private readonly user2Service: User2Service){}  //Dependency Injection

    @Post()
    createUsers2(){
        return this.user2Service.createUser2();
    } 

    @Get()
    getAllUsers2(){
        return this.user2Service.findAll();
    }
    
}
