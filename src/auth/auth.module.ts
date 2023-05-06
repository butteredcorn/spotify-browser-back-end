import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './auth.guard';
import { AuthStrategy } from './auth.strategy';
import { AuthService } from './auth.service';
import jwtConfig from './auth.jwtconfig';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    PassportModule,
  ],
  providers: [AuthStrategy, AuthGuard, AuthService],
  exports: [AuthStrategy, AuthGuard, AuthService],
})
export class AuthModule {}
