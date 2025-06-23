"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./AuthDto/register.dto");
const login_dto_1 = require("./AuthDto/login.dto");
const verifiyDto_1 = require("./AuthDto/verifiyDto");
const sendVerifyDto_1 = require("./AuthDto/sendVerifyDto");
const ResetPasswordDto_1 = require("./AuthDto/ResetPasswordDto");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    Register(payload) {
        return this.authService.register(payload);
    }
    Very(payload) {
        return this.authService.verify(payload);
    }
    Login(payload) {
        return this.authService.login(payload);
    }
    sendVerify(payload) {
        return this.authService.sendVerify(payload);
    }
    resetPassword(payload) {
        return this.authService.reset_password(payload);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Foydalanuvchini ro\'yxatdan o\'tkazish' }),
    (0, swagger_1.ApiBody)({ type: register_dto_1.RegisterDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Verification email yuborildi' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Username yoki email allaqachon mavjud' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "Register", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, swagger_1.ApiOperation)({ summary: 'Email orqali kelgan kodni tasdiqlash' }),
    (0, swagger_1.ApiBody)({ type: verifiyDto_1.VerificationDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Foydalanuvchi yaratildi va token qaytarildi' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Otp xato yoki muddati o\'tgan' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verifiyDto_1.VerificationDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "Very", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Foydalanuvchini tizimga kiritish' }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Muvaffaqiyatli login va tokenlar' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Email mavjud emas yoki parol xato' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "Login", null);
__decorate([
    (0, common_1.Post)('send-verify'),
    (0, swagger_1.ApiOperation)({ summary: 'Parolni tiklash uchun emailga kod yuborish' }),
    (0, swagger_1.ApiBody)({ type: sendVerifyDto_1.sendVerifyDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kod emailga yuborildi' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sendVerifyDto_1.sendVerifyDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "sendVerify", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Parolni tiklash' }),
    (0, swagger_1.ApiBody)({ type: ResetPasswordDto_1.resetPasswordDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Parol yangilandi' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Otp xato yoki muddati o\'tgan' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ResetPasswordDto_1.resetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map