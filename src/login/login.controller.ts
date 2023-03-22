import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginService, SpotifyToken } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() body: { code: string }): Promise<SpotifyToken> {
    const token = await this.loginService.login(body.code);

    if (token == null)
      throw new UnauthorizedException('Error with Spotify authentication.');

    return token;
  }

  @Post()
  async refresh(@Body() body: { refreshToken: string }) {
    const token = await this.loginService.refresh(body.refreshToken);
    if (token == null)
      throw new UnauthorizedException('Error with Spotify authentication.');
    return token;
  }
}
