import { InputType, Field } from "type-graphql";

import { User } from "../../entity/User";

@InputType()
export class NewUserInput implements Partial<User> {
   
    @Field({ nullable: false })
    firstName: string;
  
    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: false })
    email: string;
    
    @Field({ nullable: false })
    password: string;
  

}
