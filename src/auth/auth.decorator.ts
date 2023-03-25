import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

interface User {
  token?: string;
}

export interface UserRequest extends Request {
  user: User;
}

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const httpRequest = ctx.switchToHttp().getRequest();
  const request: UserRequest = httpRequest
    ? httpRequest
    : GqlExecutionContext.create(ctx)?.getContext()?.req;
  return request?.user;
});
