import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {TransactionService} from './transaction.service';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {UpdateTransactionDto} from './dto/update-transaction.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AuthorGuard} from "../guard/author.guard";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
        return this.transactionService.create(createTransactionDto, +req.user.id);
    }

    @Get(':type/find')
    @UseGuards(JwtAuthGuard)
    findTransactionByType(@Req() req, @Param('type') type: string) {
        return this.transactionService.findTransactionByType(+req.user.id, type)
    }

    @Get('pagination')
    @UseGuards(JwtAuthGuard)
    findAllWithPagination(@Req() req,@Query('search') search:string = "" ,@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        return this.transactionService.findAllWithPagination(+req.user.id, +page, +limit, search);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req) {
        return this.transactionService.findAll(+req.user.id);
    }

    @Get(':type/:id')
    @UseGuards(JwtAuthGuard, AuthorGuard)
    findOne(@Req() req) {
        return this.transactionService.findOne(req.transaction);
    }

    @Patch(':type/:id')
    @UseGuards(JwtAuthGuard, AuthorGuard)
    update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto, @Req() req) {
        return this.transactionService.update(+id, updateTransactionDto);
    }

    @Delete(':type/:id')
    @UseGuards(JwtAuthGuard, AuthorGuard)
    remove(@Param('id') id: string) {
        return this.transactionService.remove(+id);
    }
}
