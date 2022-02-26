import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Injectable()
export default class NodemailerConfigService implements MailerOptionsFactory {
    constructor(private configService: ConfigService) {
    }

    createMailerOptions(): Promise<MailerOptions> | MailerOptions {
        return {
            transport: {
                host: this.configService.get('MAIL_HOST'),
                port: this.configService.get('MAIL_PORT'),
                auth: {
                    user: this.configService.get('MAIL_USER'),
                    pass: this.configService.get('MAIL_PASS'),
                },
                ignoreTLS: true,
                secure: false,
            },
            defaults: {
                name: this.configService.get('MAIL_FROM_NAME'),
                from: this.configService.get('MAIL_FROM_ADDRESS'),
            },
            preview: true,
            template: {
                dir: `${process.cwd()}/templates`,
                adapter: new HandlebarsAdapter(),
                options: { strict: true },
            },
        };
    }
}
