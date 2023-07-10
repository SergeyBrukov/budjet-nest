import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Category} from "../../category/entities/category.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    @Unique(["title"])
    title: string;

    @Column({nullable: true})
    type: string;

    @Column()
    amount: number;

    @CreateDateColumn()
    createAt: Date

    @ManyToOne(() => User, (user) => user.transaction)
    @JoinColumn({name: "user_id"})
    user: User

    @ManyToOne(() => Category, (category) => category.transaction)
    @JoinColumn({name: "category_id"})
    category: Category

    @UpdateDateColumn()
    updatedAt: Date
}
