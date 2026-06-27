import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from './schemas/teacher.schema';

@Injectable()
export class TeacherService {
  constructor(@InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>) {}

  async createTeacher(): Promise<Teacher> {
    const teacher = new this.teacherModel({
      name: 'Aditya',
      subjects: ['English', 'Hindi', 'Marathi'],
    });

    return teacher.save();
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return this.teacherModel.find().exec();
  }
}
