import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    userName: string;
}

export class GetUserDto {

    @ApiProperty()
    user: User

    @ApiProperty()
    token: string;
}

