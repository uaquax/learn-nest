import { Contains, IsEmail, IsNotEmpty, IsStrongPassword, Length, Max, Min } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @Length(4, 15)
    username: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}