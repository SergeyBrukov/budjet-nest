import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {TransactionService} from './transaction.service';
import {TransactionController} from './transaction.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Transaction} from "./entities/transaction.entity";
import {TransactionMiddleware} from "./transaction.middleware";
import {Category} from "../category/entities/category.entity";
import {CategoryService} from "../category/category.service";

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Category])],
  controllers: [TransactionController],
  providers: [TransactionService, CategoryService],
  exports: [TransactionService]
})
export class TransactionModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
        .apply(TransactionMiddleware)
        .exclude(
            {path: "transaction", method: RequestMethod.POST},
            {path: "transaction", method: RequestMethod.GET},
            {path: "transaction/pagination", method: RequestMethod.GET},
            {path: "transaction/:type/find", method: RequestMethod.GET}
        )
        .forRoutes(TransactionController)
  }
}
