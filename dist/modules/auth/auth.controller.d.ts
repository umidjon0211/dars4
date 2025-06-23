import { AuthService } from './auth.service';
import { RegisterDto } from './AuthDto/register.dto';
import { LoginDto } from './AuthDto/login.dto';
import { VerificationDto } from './AuthDto/verifiyDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    Register(payload: RegisterDto): Promise<{
        message: string;
    }>;
    Login(payload: LoginDto): Promise<{
        token: {
            accessToken: string;
            refreshToken?: undefined;
        } | {
            accessToken: string;
            refreshToken: string;
        };
        exists: import("../../common/models/user.models").Users;
    }>;
    Very(payload: VerificationDto): Promise<{
        accessToken: string;
        refreshToken?: undefined;
    } | {
        accessToken: string;
        refreshToken: string;
    }>;
}
