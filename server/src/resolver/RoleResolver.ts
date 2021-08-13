import { ApolloError } from 'apollo-server-express';
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';

import { Role } from '../entity/Role';

import { NewRoleInput } from './types/RoleInput';

@Resolver(() => Role)
export class RoleResolver {
  @Authorized()
  @Query(() => [Role])
  async roles(): Promise<Role[]> {
    const roles = await Role.find();
    if (roles === undefined) {
      throw new ApolloError("Roles not found");
    }
    return roles;
  }

  @Authorized()
  @Query(() => Role)
  async role(@Arg('id') id: string): Promise<Role> {
    const role = await Role.findOne(id);
    if (role === undefined) {
      throw new ApolloError("Role Not found");
    }
    return role;
  }

  @Mutation(() => Role)
   createRole(
    @Arg('newRoleData') newRoleData: NewRoleInput,
   
  ): Promise<Role> {
    const newRole = new Role();
    newRole.name = newRoleData.name;
    return newRole.save();
  }
}
