import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import {Category} from "../../category/entities/category.entity";
import {Transaction} from "../../transaction/entities/transaction.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    userName: string

    @Column()
    @Unique(['email'])
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Category, (category) => category.user, {onDelete: 'CASCADE'})
    categories: Category[]

    @OneToMany(() => Transaction, (transaction) => transaction.user, {onDelete: 'CASCADE'})
    transaction: Transaction[]

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
