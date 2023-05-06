import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(AuthStrategy.name);

  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    } as StrategyOptions);
  }

  // Passport first verifies the JWT's signature and decodes the JSON.
  // It then invokes our validate() method passing the decoded JSON as its single parameter.
  async validate(jwtToken) {
    // Passport automatically creates a user object, based on the value we return from the validate() method
    // and assigns it to the Request object as req.user
    return { token: jwtToken };
  }
}
