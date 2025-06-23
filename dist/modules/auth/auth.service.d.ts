import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/common/mail/mail.service';
import { Users } from 'src/common/models/user.models';
import { RegisterDto } from './AuthDto/register.dto';
import { LoginDto } from './AuthDto/login.dto';
import { RedisService } from 'src/common/redis/redis.service';
import { VerificationDto } from './AuthDto/verifiyDto';
import { resetPasswordDto } from './AuthDto/ResetPasswordDto';
import { sendVerifyDto } from './AuthDto/sendVerifyDto';
export declare class AuthService {
    private userModel;
    private jwtService;
    private mailerService;
    private redisService;
    constructor(userModel: typeof Users, jwtService: JwtService, mailerService: MailService, redisService: RedisService);
    private generateToken;
    register(payload: Required<RegisterDto>): Promise<{
        message: string;
    }>;
    verify(payload: VerificationDto): Promise<{
        accessToken: string;
        refreshToken?: undefined;
    } | {
        accessToken: string;
        refreshToken: string;
    }>;
    login(payload: Required<LoginDto>): Promise<{
        token: {
            accessToken: string;
            refreshToken?: undefined;
        } | {
            accessToken: string;
            refreshToken: string;
        };
        exists: Users;
    }>;
    sendVerify(payload: sendVerifyDto): Promise<{
        message: string;
    }>;
    reset_password(payload: resetPasswordDto): Promise<{
        message: string;
    }>;
}
