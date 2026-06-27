import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User2 } from './schemas/user2.schema';
import { Model } from 'mongoose';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class User2Service {

    constructor(
        @InjectModel(User2.name) private user2Model: Model<User2>,
        @InjectModel('Profile') private profileModel: Model<Profile>
    ) {}

    async createUser2(): Promise<User2> {
        const profile = await new this.profileModel({
            age: 23,
            qualification: 'B.Tech'
        }).save();

        const user2 = new this.user2Model({
            name: 'Aditya I',
            profile: profile._id
        });
        
        return user2.save();
    }

    async findAll(): Promise<User2[]> {
        return this.user2Model.find().populate('profile').exec();

}
}
