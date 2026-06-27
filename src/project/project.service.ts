import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Developer } from './schemas/developer.schema';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectService {
    constructor(
    @InjectModel(Developer.name) private developerModel: Model<Developer>,
    @InjectModel(Project.name) private ProjectModel: Model<Project>
    ){}

    async seed(): Promise<{ dev1: Developer; dev2: Developer }> {
        const [projectA] = await this.ProjectModel.create([{ name: 'Nest CRM' }]);
        const [projectB] = await this.ProjectModel.create([{ name: 'Mongo Analytics' }]);

        const [dev1] = await this.developerModel.create([{ 
            name: 'Aditya',
            projects: [projectA._id, projectB._id],
        }]);

        const [dev2] = await this.developerModel.create([{ 
            name: 'Akash',
            projects: [projectA._id],
        }]);

        await this.ProjectModel.findByIdAndUpdate(projectA._id, {
            $set: { developers: [dev1._id, dev2._id] },
        });

        return { dev1, dev2 };
    }

    async getDevelopers(): Promise<Developer[]>{
        return this.developerModel.find().populate('projects').lean();
    }

    async getProjects(): Promise<Project[]>{
        return this.ProjectModel.find().populate('developers').lean();
    }
}
