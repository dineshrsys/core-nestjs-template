import { RedisModule } from 'nestjs-redis';
import { ConfigModule } from '@nestjs/config';
import { Module, Logger } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventEmitterModule } from '@nestjs/event-emitter';

import AppGateway from '@modules/app.gateway';
import AppRouteModule from '@modules/app-route.module';
import DatabaseConfigShared from '@shared/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({ useClass: DatabaseConfigShared }),
    RedisModule.register({
      url: process.env.REDIS_URL,
      onClientReady: async (client): Promise<void> => {
        client.on('error', Logger.error);
        client.on('ready', () => Logger.log('Redis is running on 6379 port'));
        client.on('restart', () => Logger.log('Attempt to restart the redis server'));
      },
    }),
    EventEmitterModule.forRoot(),
    AppRouteModule,
  ],
  providers: [AppGateway],
})
export default class AppModule {}
