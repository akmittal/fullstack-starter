import { ApolloError } from 'apollo-server-express';
import * as nunjucks from 'nunjucks';


import { VerificationToken } from '../entity/VerificationToken';
import { User } from '../entity/User';

import { logger } from './logger';
import { sendMail } from './mail';

import { generateRandomToken } from './index';

nunjucks.configure('src/templates/');
export const sendVerificationmail = async (email: string, token:string) => {
  try {
    
    const htmlContent = nunjucks.render('verify-email.njk', { firstname: 'Amit', token });

    await sendMail({
      to: email,
      from: 'mymail@gmail.com',
      sender: 'mymail@gmail.com',
      subject: 'Verify email',
      html: htmlContent,
    });
  } catch (err) {
    logger.error({ err });
  }
};
