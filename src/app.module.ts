import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './category/category.module';
import { StudentModule } from './student/student.module';
import { CustomerModule } from './customer/customer.module';
import { MynameController } from './myname/myname.controller';
import { UserRolesController } from './user-roles/user-roles.controller';
import { ExceptionController } from './exception/exception.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { EnvService } from './env/env.service';
import { EnvController } from './env/env.controller';
import { ConfigModule } from '@nestjs/config';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { NewStudentModule } from './new-student/new-student.module';
import { UserModule } from './user/user.module';
import { User2Module } from './user2/user2.module';
import { TeacherModule } from './teacher/teacher.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EmployeeModule, CategoryModule, StudentModule, CustomerModule, ConfigModule.forRoot({
    isGlobal: true,
  }), MongooseModule.forRoot(process.env.MONGO_URL!), NewStudentModule, UserModule, User2Module, TeacherModule, ProjectModule, AuthModule],
  controllers: [AppController, ProductController, MynameController, UserRolesController, ExceptionController, DatabaseController, EnvController],
  providers: [AppService, ProductService, DatabaseService, EnvService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
