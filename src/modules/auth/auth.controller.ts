import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './AuthDto/register.dto';
import { LoginDto } from './AuthDto/login.dto';
import { VerificationDto } from './AuthDto/verifiyDto';
import { sendVerifyDto } from './AuthDto/sendVerifyDto';
import { resetPasswordDto } from './AuthDto/ResetPasswordDto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Foydalanuvchini ro\'yxatdan o\'tkazish' })
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 201, description: 'Verification email yuborildi' })
    @ApiResponse({ status: 409, description: 'Username yoki email allaqachon mavjud' })
    Register(@Body() payload: RegisterDto) {
        return this.authService.register(payload);
    }

    @Post('verify')
    @ApiOperation({ summary: 'Email orqali kelgan kodni tasdiqlash' })
    @ApiBody({ type: VerificationDto })
    @ApiResponse({ status: 201, description: 'Foydalanuvchi yaratildi va token qaytarildi' })
    @ApiResponse({ status: 400, description: 'Otp xato yoki muddati o\'tgan' })
    Very(@Body() payload: VerificationDto) {
        return this.authService.verify(payload);
    }

    @Post('login')
    @ApiOperation({ summary: 'Foydalanuvchini tizimga kiritish' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'Muvaffaqiyatli login va tokenlar' })
    @ApiResponse({ status: 400, description: 'Email mavjud emas yoki parol xato' })
    Login(@Body() payload: LoginDto) {
        return this.authService.login(payload);
    }

    @Post('send-verify')
    @ApiOperation({ summary: 'Parolni tiklash uchun emailga kod yuborish' })
    @ApiBody({ type: sendVerifyDto })
    @ApiResponse({ status: 200, description: 'Kod emailga yuborildi' })
    sendVerify(@Body() payload: sendVerifyDto) {
        return this.authService.sendVerify(payload);
    }

    @Post('reset-password')
    @ApiOperation({ summary: 'Parolni tiklash' })
    @ApiBody({ type: resetPasswordDto })
    @ApiResponse({ status: 200, description: 'Parol yangilandi' })
    @ApiResponse({ status: 400, description: 'Otp xato yoki muddati o\'tgan' })
    resetPassword(@Body() payload: resetPasswordDto) {
        return this.authService.reset_password(payload);
    }
}
    