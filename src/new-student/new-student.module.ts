import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from '../student/student.schema';
import { NewStudentService } from './new-student.service';
import { NewStudentController } from './new-student.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }])
  ],
  controllers: [NewStudentController],
  providers: [NewStudentService],
  exports: [NewStudentService],
})
export class NewStudentModule {}
