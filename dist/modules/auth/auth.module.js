"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const sequelize_1 = require("@nestjs/sequelize");
const user_models_1 = require("../../common/models/user.models");
const mail_module_1 = require("../../common/mail/mail.module");
const jwt_access_module_1 = require("../../common/Jwt/jwt.access.module");
const jwt_refresh_module_1 = require("../../common/Jwt/jwt.refresh.module");
const redis_module_1 = require("../../common/redis/redis.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([user_models_1.Users]),
            mail_module_1.MailModule, jwt_access_module_1.JwtAccessModule, jwt_refresh_module_1.JwtRefreshModule, redis_module_1.RedisModule],
        providers: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map