import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Profile } from './profile.schema';


@Schema()
export class User2 extends Document{

    @Prop()
    name: string;

    @Prop( {type: MongooseSchema.Types.ObjectId, ref: 'Profile'})
    profile: Profile;
}


export const User2Schema = SchemaFactory.createForClass(User2);