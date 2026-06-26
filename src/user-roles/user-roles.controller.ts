import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role } from 'src/guards/roles/roles.enmus';
import { Roles } from 'src/guards/roles/roles.decorator';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('user-roles')
export class UserRolesController {
    @Get('admin-data')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    getAdminData(){
        return { message: 'This data is only accessible to Admins' };
    }

    @Get('user-data')
    getUserData(){
        return { message: 'This data is accessible to all users' };
    }
}
