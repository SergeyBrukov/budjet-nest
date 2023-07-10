import {Category} from "../../category/entities/category.entity";
import {User} from "../../user/entities/user.entity";
import {IsNotEmpty, IsNumber, IsOptional, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTransactionDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount: number

    @ApiProperty()
    @IsString()
    @MinLength(6, {message: "Type must be more then 6 symbol"})
    type: 'expense' | 'income'

    @ApiProperty({type: String})
    @IsNotEmpty()
    category: Category
}
