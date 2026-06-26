import { IsNumber, IsString } from "class-validator";

//validating inputs from frontend
export class CreateCustomerDto {
    @IsString()
    name: string;
    @IsNumber()
    age: number;
}