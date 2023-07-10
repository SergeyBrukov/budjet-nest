import {Controller, Get, Header, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {ApiBearerAuth, ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GetUserDto, User} from "../user/dto/get-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";

@ApiTags("auth")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiBody({
        type: LoginUserDto
    })
    @ApiResponse({
        type:GetUserDto
    })
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Header('Authorization', 'Bearer {token}')
    @ApiResponse({
        type: User
    })
    getProfile(@Request() req) {
        return req.user;
    }
}
