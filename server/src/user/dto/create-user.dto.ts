import {IsEmail, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty()
    @MinLength(6, {message: "Name must be more then 6 symbol"})
    userName: string

    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @MinLength(6, {message: "Password must be more then 6 symbol"})
    password: string
}
