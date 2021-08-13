import { Field,  InputType } from 'type-graphql';

import { Role } from '../../entity/Role';

@InputType()
export class NewRoleInput implements Partial<Role> {

  @Field({ nullable: false })
  name: string;


}
