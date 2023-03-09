import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { ExecException } from "child_process";


export const GetUser = createParamDecorator(
    (data:string, ctx: ExecutionContext) => {
        console.log({ctx});

        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        if(!user)
            throw new InternalServerErrorException('User not found  (request)');    

        return (!data)
            ? user
            :user[data];
    }


);