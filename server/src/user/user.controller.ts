import {Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {GetUserDto} from "./dto/get-user.dto";

@ApiTags("user")
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    type: GetUserDto
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get(":id")
  // findOne(@Param("email") email: string) {
  //   return this.usersService.findOne(email);
  // }
}
