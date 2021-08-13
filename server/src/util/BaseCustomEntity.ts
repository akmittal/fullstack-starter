import { BaseEntity, BeforeInsert, BeforeUpdate, Column } from 'typeorm';
import { Field } from 'type-graphql';

export abstract class BaseCustomEntity extends BaseEntity {
    @Column()
    @Field()
    createdAt: Date;

    @Column()
    @Field()
    updatedAt: Date;

    @BeforeInsert()
    setCreationDate(): void {
        this.updatedAt = new Date();
        this.createdAt = new Date();
    }
    
    @BeforeUpdate()
    setUpdateDate(): void {
        this.updatedAt = new Date();
    }
}
