import { AuthService } from './auth.service';
import { RegisterDto } from './AuthDto/register.dto';
import { LoginDto } from './AuthDto/login.dto';
import { VerificationDto } from './AuthDto/verifiyDto';
import { sendVerifyDto } from './AuthDto/sendVerifyDto';
import { resetPasswordDto } from './AuthDto/ResetPasswordDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    Register(payload: RegisterDto): Promise<{
        message: string;
    }>;
    Very(payload: VerificationDto): Promise<{
        accessToken: string;
        refreshToken?: undefined;
    } | {
        accessToken: string;
        refreshToken: string;
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
    sendVerify(payload: sendVerifyDto): Promise<{
        message: string;
    }>;
    resetPassword(payload: resetPasswordDto): Promise<{
        message: string;
    }>;
}
