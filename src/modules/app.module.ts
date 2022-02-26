import { RedisModule } from 'nestjs-redis';
import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule, ConfigService } from '@nestjs/config';

import AppGateway from '@modules/app.gateway';
import AppRouteModule from '@modules/app-route.module';
import DatabaseConfigService from '@common/configs/database-config.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        SequelizeModule.forRootAsync({ useClass: DatabaseConfigService }),
        RedisModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    url: configService.get('REDIS_URL'),
                    onClientReady: async (client): Promise<void> => {
                        client.on('error', Logger.error);
                        client.on('ready', () => Logger.log('Redis is running on 6379 port'));
                        client.on('restart', () => Logger.log('Attempt to restart the redis server'));
                    },
                };
            },
            inject: [ConfigService],
        }),
        //MailerModule.register(),
        EventEmitterModule.forRoot(),
        AppRouteModule,
    ],
    providers: [AppGateway],
})
export default class AppModule {
}
