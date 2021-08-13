import { randomInt } from 'crypto';

export function generaterandomNumber(): Promise<number> {
  return new Promise((resolve, reject) => {
    randomInt(100000, 999999, (err, num) => {
      if (err) reject(err);
      resolve(num);
    });
  });
}
