import { SmtpOptions } from '@libs/mailer/interfaces/smtp/smtp-options.interface';
import { SendGridModuleOptions } from '@libs/mailer/interfaces/sendgrid/sendgrid-options.interface';

export interface MailerInterface {
    send(): Promise<any>;
}

export interface MailerModuleOptions {
    driver: string;
    options: SmtpOptions
        | SendGridModuleOptions;
}
