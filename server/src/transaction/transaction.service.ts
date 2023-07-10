import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {UpdateTransactionDto} from './dto/update-transaction.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Transaction} from "./entities/transaction.entity";
import {ILike, Repository} from "typeorm";

@Injectable()
export class TransactionService {

    constructor(
        @InjectRepository(Transaction)
        private transactionDb: Repository<Transaction>
    ) {
    }

    async totalCountExpenseAndIncome(userId: number) {

        const findObject = {
            where: {
                user: {id: userId}
            },
        }

        let transactionExpenseIncomeGroup = {
            totalExpense: 0,
            totalIncome: 0
        };

        const transactionsTotalItem = await this.transactionDb.find(findObject);

        if(transactionsTotalItem.length > 0) {
            transactionExpenseIncomeGroup = transactionsTotalItem.reduce((acc, cur) => {
                if(cur.type === "income") {
                    acc.totalIncome += cur.amount
                } else {
                    acc.totalExpense += cur.amount
                }
                return acc
            }, transactionExpenseIncomeGroup)
        }

        return transactionExpenseIncomeGroup;
    }

    async create(createTransactionDto: CreateTransactionDto, userId: number) {

        const findTransaction = await this.transactionDb.findBy({
            title: createTransactionDto.title
        })

        if (findTransaction.length) {
            throw new BadRequestException('This transaction already exist')
        }

        const newTransaction = await this.transactionDb.create({
            title: createTransactionDto.title,
            amount: createTransactionDto.amount,
            type: createTransactionDto.type,
            user: {id: userId},
            category: {id: +createTransactionDto.category}
        })

        const transactionExpenseIncomeGroup = await this.totalCountExpenseAndIncome(userId);

        const transaction = await this.transactionDb.save(newTransaction);

        return {
            transaction: transaction,
            transactionExpenseIncomeGroup
        };
    }

    async findAll(userId: number) {

        const transactions = await this.transactionDb.find({
            where: {
                user: {id: userId}
            },
            order: {
                createAt: 'desc'
            }
        })

        if (!transactions) {
            throw new BadRequestException('Something were wrong')
        }

        return transactions;
    }

    async findOne(transaction: Transaction) {
        return transaction;
    }

    async update(id: number, updateTransactionDto: UpdateTransactionDto) {
        return await this.transactionDb.update(id, updateTransactionDto);
    }

    async remove(id: number) {
        return await this.transactionDb.delete(id);
    }

    async findAllWithPagination(userId: number, page: number, limit: number, search: string) {

        const findObject = {
            where: {
                user: {id: userId},
                title: ILike(`%${search}%`)
            },
        }

        const transactionsTotalItem = await this.transactionDb.find(findObject);

        const transactions = await this.transactionDb.find({
            ...findObject,
            relations: {
                category: true,
                user: true
            },
            order: {
                createAt: 'desc'
            },
            take: limit,
            skip: (page - 1) * limit
        })


        if (!transactions) {
            throw new BadRequestException('Something were wrong')
        }

        const transactionExpenseIncomeGroup = await this.totalCountExpenseAndIncome(userId);

        return {transactions, totalAmount: transactionsTotalItem.length, transactionExpenseIncomeGroup};
    }

    async findTransactionByType(userId: number, type: string) {

        const transactions = await this.transactionDb.find({
            where: {
                user: {id: userId},
                type
            }
        });

        const total = transactions.reduce((acc, curr) => {
            return acc + curr.amount
        }, 0)

        return total

    }
}
