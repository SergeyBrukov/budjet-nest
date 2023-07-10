import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {IUser} from "../types/types";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string) {

        const user = await this.usersService.findOne(email);

        const passwordIsMatch = await bcrypt.compare(pass, user.password);

        if (user && passwordIsMatch) {
            return user;
        }

        throw new BadRequestException("Incorrect login or password");
    }

    async login(user: IUser) {
        const {id, email, userName} = user;

        return {
            user: {
                id,
                email,
                userName
            },
            token: this.jwtService.sign({id: user.id, email: user.email})
        }
    }
}
