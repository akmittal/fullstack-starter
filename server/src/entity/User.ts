import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { IsPhoneNumber, Length } from 'class-validator';
import bcrypt from "bcrypt";

import { BaseCustomEntity } from '../util/BaseCustomEntity';

import { Role } from './Role';


@Entity()
@ObjectType()
export class User extends BaseCustomEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Length(2, 25)
  @Column()
  @Field({ nullable: false })
  firstName: string;

  @Column()
  @Field({ nullable: true })
  lastName?: string;

  @Column({default:false})
  @Field({ nullable: false })
  verified?: boolean;

  @Column()
  password: string;

  @Index()
  @IsPhoneNumber()
  @Column({ unique: true, nullable: false })
  @Field({ nullable: false })
  email: string;

  @ManyToMany(() => Role)
  @Field(() => [Role])
  roles: Role[];
  
 @BeforeInsert()
 async hashPassword():Promise<void>{
    this.password = await bcrypt.hash(this.password,5);
 }
}
