import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MailingService} from "../mailing/mailing.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: {expiresIn: '30d'},
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, MailingService]
})
export class UserModule {}
