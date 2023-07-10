import {CanActivate, ExecutionContext, Injectable, NotFoundException} from "@nestjs/common";
import {TransactionService} from "../transaction/transaction.service";
import {CategoryService} from "../category/category.service";

@Injectable()
export class AuthorGuard implements CanActivate {

    constructor(
        private transactionService: TransactionService,
        private categoriesService: CategoryService
    ) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const {id, type} = request.params;

        let entity;

        switch (type) {
            case 'transaction': {
                entity = await this.transactionService.findOne(request.transaction)
                break
            }
            case 'categories': {
                entity = await this.categoriesService.findOne(id)
                break
            }
            default:
                throw new NotFoundException('Something were wrong')
        }

        const user = request.user;

        if(entity && user && entity.user.id === user.id) {
            return true
        }

        throw new NotFoundException('Something were wrong')
    }
}