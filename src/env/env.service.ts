import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
    constructor(private configureService: ConfigService) {}

    getDbUrl() {
        return this.configureService.get<String>('DATABASE_URL');
    }
    
    getJwtSecret() {
        return this.configureService.get<String>('JWT_SECRET');
    }
}