import { ApolloError } from 'apollo-server-express';
import { Arg, Mutation, Resolver } from 'type-graphql';

import { VerificationToken } from '../entity/VerificationToken';
import { User } from '../entity/User';
import { logger } from '../util/logger';

@Resolver(() => VerificationToken)
export class EmailResolver {
  @Mutation(() => Boolean)
  async verifyEmail(@Arg('token') token: string): Promise<boolean> {
    try{
      const emailToken = await VerificationToken.findOne({ where: { token }, relations: ['user'] });
      if (!emailToken) {
        return false;
      }
      const user = await User.findOne(emailToken.user.id);
      if (!user) {
        logger.error('User not found in DB to verify email');
        throw new ApolloError('User not found in DB to verify email');
      }
      user.verified = true;
      await user.save();
      emailToken.remove();
      return true;
    } catch(er){
      logger.error(er)
      return er;
    }
   
  }
}
