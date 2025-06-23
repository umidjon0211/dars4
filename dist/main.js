"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Authorization')
        .setDescription('The Auth API description')
        .setVersion('1.0')
        .addTag('Register & Login')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger_umidjon', app, document);
    await app.listen(process.env.PORT ?? 3000, () => console.log(`Server is running on ${process.env.PORT ?? 3000}`));
}
bootstrap();
//# sourceMappingURL=main.js.map