import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendGridModuleOptions, SendGridModuleOptionsFactory } from '@anchan828/nest-sendgrid';

@Injectable()
export default class SendgridConfigService implements SendGridModuleOptionsFactory {
    constructor(private configService: ConfigService) {
    }

    createSendGridModuleOptions(): Promise<SendGridModuleOptions> | SendGridModuleOptions {
        return {
            apikey: this.configService.get('SENDGRID_API_KEY', ''),
        };
    }
}
