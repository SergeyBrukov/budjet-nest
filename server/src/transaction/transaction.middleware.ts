import {Injectable, NestMiddleware, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Transaction} from "./entities/transaction.entity";
import {Repository} from "typeorm";
import {Request} from "express";
import {Response} from "express";

@Injectable()
export class TransactionMiddleware implements NestMiddleware {

  constructor(
      @InjectRepository(Transaction)
      private transactionDb: Repository<Transaction>
  ) {}

  async use(req: Request, res: Response, next: () => void) {

    const {id:transactionId} = req.params;

    const transaction = await this.transactionDb.findOne({
      where: {
        id: +transactionId
      },
      relations: {
        user: true
      }
    })

    if(!transaction) {
      throw new NotFoundException('Transaction not found')
    }

    req["transaction"] = transaction

    next();
  }
}
