import { ExpressContext } from "apollo-server-express";


import { User } from "../../entity/User";

export interface Context {
  user?: User;
  error?:Error;
  res: ExpressContext["res"]
}