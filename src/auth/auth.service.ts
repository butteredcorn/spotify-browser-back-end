import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // the spotify accessToken
  async sign(payload: string) {
    return this.jwtService.sign(payload);
  }
}
