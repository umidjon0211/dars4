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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const mail_service_1 = require("../../common/mail/mail.service");
const user_models_1 = require("../../common/models/user.models");
const bcrypt = require("bcrypt");
const jwt_utils_1 = require("../../common/utils/jwt.utils");
const redis_service_1 = require("../../common/redis/redis.service");
let AuthService = class AuthService {
    userModel;
    jwtService;
    mailerService;
    redisService;
    constructor(userModel, jwtService, mailerService, redisService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
        this.redisService = redisService;
    }
    async generateToken(payload, accessTokenOnly = false) {
        const accessToken = await this.jwtService.signAsync(payload, jwt_utils_1.JwtAccessToken);
        if (accessTokenOnly) {
            return { accessToken };
        }
        const refreshToken = await this.jwtService.signAsync({ id: payload.id }, jwt_utils_1.JWtRefreshToken);
        return { accessToken, refreshToken };
    }
    async register(payload) {
        let username = await this.userModel.findOne({ where: { username: payload.username } });
        if (username)
            throw new common_1.ConflictException(`${payload.username} is already registered!`);
        let email = await this.userModel.findOne({ where: { email: payload.email } });
        if (email)
            throw new common_1.ConflictException(`${payload.email} is already exists!`);
        let code = Math.floor((Math.random() * 100000));
        await this.mailerService.verification(payload.email, 'Verification', code);
        await this.redisService.set(`register:${payload.email}`, JSON.stringify({ ...payload, code }), 600);
        return {
            message: `Verification Successfully send to ${payload.email}`
        };
    }
    async verify(payload) {
        let stored = await this.redisService.get(`register:${payload.email}`);
        if (!stored)
            throw new common_1.BadRequestException("Otp expire or not Found");
        let userData = JSON.parse(stored);
        if (userData.code != payload.code)
            throw new common_1.BadRequestException("Otp invalide");
        await this.redisService.del(`register: ${payload.email}`);
        delete userData.code;
        let hash = await bcrypt.hash(userData.password, 10);
        let user = await this.userModel.create({ ...userData, password: hash });
        return this.generateToken({ id: user.dataValues.id, role: user.dataValues.role });
    }
    async login(payload) {
        let exists = await this.userModel.findOne({ where: { email: payload.email } });
        if (!exists)
            throw new common_1.BadRequestException(`this ${payload.email} does not exists`);
        let compare = await bcrypt.compare(payload.password, exists.dataValues.password);
        if (!compare)
            throw new common_1.BadRequestException(`this ${payload.password} incorrect password`);
        let token = await this.generateToken({ id: exists.dataValues.id, role: exists.dataValues.role });
        return { token, exists, };
    }
    async sendVerify(payload) {
        let code = Math.floor(Math.random() * 10000);
        await this.mailerService.verification(payload.email, 'Veritification code', code);
        await this.redisService.set(`pass:${payload.email}`, JSON.stringify({ ...payload, code }), 600);
        return {
            message: `Verification code send to ${payload.email}`
        };
    }
    async reset_password(payload) {
        let stored = await this.redisService.get(`pass:${payload.email}`);
        if (!stored)
            throw new common_1.BadRequestException("Otp expire or not found");
        let userData = JSON.parse(stored);
        if (userData.code != payload.code)
            throw new common_1.BadRequestException("Otp invalid");
        await this.redisService.del(`pass:${payload.email}`);
        let hash = await bcrypt.hash(payload.password, 10);
        await this.userModel.update({ password: hash }, {
            where: { email: payload.email }
        });
        return {
            message: "Password Updated SuccessFully"
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_models_1.Users)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        mail_service_1.MailService,
        redis_service_1.RedisService])
], AuthService);
//# sourceMappingURL=auth.service.js.map