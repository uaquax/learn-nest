import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateUserNumberDto {
    @IsNotEmpty()
    @IsNumberString()
    number: number
}