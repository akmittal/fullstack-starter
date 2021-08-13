import { createWriteStream } from 'fs';
import { randomBytes } from 'crypto';
import { promisify } from 'util';

import { AuthChecker } from 'type-graphql';
import { classToPlain } from 'class-transformer';
import jwt from 'jsonwebtoken';
import { FileUpload } from 'graphql-upload';

import { Context } from '../resolver/types/context';
import { User } from '../entity/User';
import { Role } from '../entity/Role';


const randomBytesP = promisify(randomBytes);

// a week
const oneWeek = 60 * 60 * 24 * 7;

export const getJWTSecret = (): string => {
  return process.env.JWT_SECRET || '';
};

export const customAuthChecker: AuthChecker<Context> = ({ context: { user } }, roles) => {
  if (roles.length === 0) {
    // if `@Authorized()`, check only is user exist
    return user !== undefined;
  }
  // there are some roles defined now

  if (!user) {
    // and if no user, restrict access
    return false;
  }
  if (user.roles.some((role:Role) => roles.includes(role.name))) {
    // grant access if the roles overlap
    return true;
  }

  // no roles matched, restrict access
  return false;
};


export const getUser = (token: string): User => {
  const user: User = <User>jwt.verify(token, getJWTSecret());
 
  return user;
};

export const signJWTToken = (user: User): string => {
  if (!user) {
    throw new Error('User data invalid');
  }
  return jwt.sign(classToPlain(user), getJWTSecret(), { algorithm: 'HS512', expiresIn: oneWeek });
};

export const storeFile = (file: FileUpload): Promise<string> => {
  const destPath = `uploads/${file.filename}`;
  return new Promise((resolve, reject) => {
    file
      .createReadStream()
      .pipe(createWriteStream(destPath))
      .on('error', reject)
      .on('finish', () => resolve(destPath));
  });
};

export const generateRandomToken = async (length: number) => {
  return (await randomBytesP(length)).toString('hex');
};
