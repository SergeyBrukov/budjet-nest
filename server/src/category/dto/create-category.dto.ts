import {IsNotEmpty, IsOptional} from "class-validator";
import {User} from "../../user/entities/user.entity";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsOptional()
    user?: User
}
