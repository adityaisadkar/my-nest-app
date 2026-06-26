import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {

      private employee = [
        {Empid: 1, name: 'Aditya', age:23},
        {Empid: 2, name: 'Akash', age:26}
    ];

    getAllEmployees(){
        return this.employee;
    }
}
