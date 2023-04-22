import { LoginService, SpotifyToken } from './login.service';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    login(body: {
        code: string;
    }): Promise<SpotifyToken>;
    refresh(body: {
        refreshToken: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        expiry: number;
    }>;
}
