import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { BaseCustomEntity } from '../util/BaseCustomEntity';

import { User } from './User';

@Entity()
@ObjectType()
export class VerificationToken extends BaseCustomEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @JoinColumn()
  @OneToOne(() => User, { nullable: false })
  @Field(() => User)
  user: User;

  @Column()
  validTill: Date;

  @Column({ nullable: false, length:96 })
  token: string;
}
