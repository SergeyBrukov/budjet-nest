import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne, OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Transaction} from "../../transaction/entities/transaction.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    @Unique(["title"])
    title: string;

    @ManyToOne(() => User, (user) => user.categories)
    @JoinColumn({name: "user_id"})
    user: User

    @OneToMany(() => Transaction, (transaction) => transaction.category)
    transaction: Transaction[]

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
