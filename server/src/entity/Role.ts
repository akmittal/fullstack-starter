import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseCustomEntity } from '../util/BaseCustomEntity';


@Entity()
@ObjectType()
export class Role extends BaseCustomEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field({ nullable: false })
  name: string;

 

}
