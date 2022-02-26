import { DynamicModule, Module } from '@nestjs/common';
import { MailerModuleOptions } from './interfaces/mailer.interface';


@Module({})
export class MailerModule {
    public static forRoot(options: MailerModuleOptions): DynamicModule {
        return {
            module: MailerModule,
        };
    }

    public static forRootAsync(options: MailerModuleOptions): DynamicModule {
        return {
            module: MailerModule,
        };
    }
}
