import { Module } from '@nestjs/common';
import { User2Service } from './user2.service';
import { User2Controller } from './user2.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User2, User2Schema } from './schemas/user2.schema';
import { ProfileSchema } from './schemas/profile.schema';

@Module({
  imports: [MongooseModule.forFeature([{ 
    name: User2.name, schema: User2Schema }, 
    {name: 'Profile', schema: ProfileSchema}
  ])],
  providers: [User2Service],
  controllers: [User2Controller]
})
export class User2Module {}
