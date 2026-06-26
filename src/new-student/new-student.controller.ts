import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { NewStudentService } from './new-student.service';
import { Student } from 'src/student/student.schema';

@Controller('new-student')
export class NewStudentController {
    constructor(private readonly newStudentService: NewStudentService) {}


    @Post()
    async addStudent(@Body() data: Partial<Student>){
        return this.newStudentService.createStudent(data);
    }

    @Get()
    async getAllStudents(){
        return this.newStudentService.getAllStudents();
    }

    @Get(':id')
    async getStudentById(@Param('id') id: string){
        return this.newStudentService.getStudentById(id);
    }

    @Put(':id')
    async updateStudent(@Param('id') id:string, @Body() data: Partial<Student>){
        return this.newStudentService.updateStudent(id, data);
    }

    @Patch(':id')
    async patchStudent(@Param('id') id:string, @Body() data: Partial<Student>){
        return this.newStudentService.patchStudent(id, data);
    }

    @Delete(':id')
    async deleteStudent(@Param('id') id:string){
        return this.newStudentService.deleteStudent(id);
    }
}
