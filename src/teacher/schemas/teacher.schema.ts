import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
  @Prop({ type: String, required: true })
  name = '';

  @Prop({ type: [String], default: [] })
  subjects: string[] = [];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);