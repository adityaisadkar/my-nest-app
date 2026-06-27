import { Controller, Get, Post } from '@nestjs/common';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
    constructor (private readonly teacherService: TeacherService){}

    @Post()
    create(){
        return this.teacherService.createTeacher();
    }

    @Get()
    getAll(){
        return this.teacherService.getAllTeachers();
    }

}
