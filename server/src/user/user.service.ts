import {BadRequestException, Injectable, Param} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt";
import {MailingService} from "../mailing/mailing.service";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
        private mailingService: MailingService
    ) {}

    async create(createUserDto: CreateUserDto) {
      const existUser = await this.usersRepository.findOne({
        where: {
          email: createUserDto.email
        }
      });

      if(existUser) {
        throw new BadRequestException('This email already exist');
      }

      const hashPassword = await bcrypt.hash(createUserDto.password, 10);

      const token = this.jwtService.sign({email: createUserDto.email});

      const user = await this.usersRepository.save({
        userName: createUserDto.userName,
        email: createUserDto.email,
        password: hashPassword
      })

        const to = createUserDto.email;
        const subject = 'Привіт!';
        const template = 'registerEmail';
        const context = { name: createUserDto.userName };

        await this.mailingService.sendEmail(to, subject, template, context);

        return {user, token};
    }

    // async findOne(@Param("id") id: number) {
    //     return this.usersRepository.findOne({
    //         where: {
    //             id
    //         }
    //     })
    // }
    //
    async findOne(email: string) {
        return this.usersRepository.findOne({
            where: {
                email
            }
        })
    }
}
