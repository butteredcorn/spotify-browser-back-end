import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

// AuthGuard applied globally, so use a Public() decorator to declare public route
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(eCtx: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(eCtx);
    const request = gqlCtx.getContext()?.req as Request;

    const isPublic = !!this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [eCtx.getHandler(), eCtx.getClass()],
    );

    if (isPublic) return true;

    return super.canActivate(new ExecutionContextHost([request]));
  }
}
