import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { classToPlain } from 'class-transformer';

import { User } from '../entity/User';
import { VerificationToken } from '../entity/VerificationToken';
import { expireAsync, getAsync, incrAsync } from '../util/redis';
import { generateRandomToken, getJWTSecret } from '../util';
import { logger } from '../util/logger';
import { sendVerificationmail } from '../util/email';

import { Context } from './types/context';

const ONE_MINUTE = 1000 * 60 * 1;
const REDIS_EXPIRE_TIME = 120;
const MAX_OTP_RETRIES = 5;

const getOneMiniteFromNow = (): Date => {
  const now = Date.now();
  return new Date(now + ONE_MINUTE);
};

const checkIfTooManyTries = async (email: string) => {
  const val = await getAsync(email);
  // check if otp tried too many times in an interval
  if (val && parseInt(val, 10) > MAX_OTP_RETRIES) {
    throw new ApolloError('OTP tried too many times, Request a new OTP');
  }
  await incrAsync(email);
  await expireAsync(email, REDIS_EXPIRE_TIME);
};

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  me(@Ctx() ctx: Context): Promise<User> {
    logger.info(`email${ctx.user?.email}`);
    if (ctx.user?.email) {
      return User.findOneOrFail({ where: { email: ctx.user.email } });
    }
    throw new ApolloError('User not loggged in');
  }

  @Mutation(() => String)
  async login(@Arg('email') email: string, @Arg('password') password: string, @Ctx() ctx: Context): Promise<boolean> {
    checkIfTooManyTries(email);

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ApolloError('User not found');
    }
    if (!user) {
      throw new ApolloError('User not verified');
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(classToPlain(user), getJWTSecret());
      ctx.res.cookie('cauth', token);
      return true;
    }
    return false;
  }

  @Mutation(() => User)
  async signUp(
    @Arg('email') email: string,
    @Arg('firstName') fName: string,
    @Arg('lastName') lName: string,
    @Arg('password') password: string,
  ): Promise<User> {
    try {
      let user = await User.findOne({ where: { email } });
      if (user) {
        throw new ApolloError('User already exist');
      }
      user = new User();
      user.firstName = fName;
      user.lastName = lName;
      user.email = email;
      user.password = password;
      // find otp if alraedy exists

      const token = new VerificationToken();

      token.updatedAt = new Date();
      token.validTill = getOneMiniteFromNow();
      const generatedOtp = await generateRandomToken(48);
      sendVerificationmail(email, generatedOtp);
      token.token = generatedOtp;
      const newUser = await user.save();
      token.user = newUser;
      await token.save();
      return newUser;
    } catch (er) {
      logger.error(er);
      return er;
    }
  }
}
