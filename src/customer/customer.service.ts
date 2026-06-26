import { Injectable } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
    private customers: Customer[] = [];

    getAllCustomers(): Customer[] {
        return this.customers;
    }

    addCustomer(CreateCustomerDto: CreateCustomerDto): Customer{
        const newCustomer: Customer = {
            id: Date.now(),
            ...CreateCustomerDto,
        };
        this.customers.push(newCustomer);
        return newCustomer;
    }
}
