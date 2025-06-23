import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: NestMailerService);
    verification(email: string, subject: string, code: number): Promise<void>;
}
