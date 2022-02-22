import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';

import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize';

@Injectable()
export default class DatabaseConfig implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const databaseConfig = {
      host: this.configService.get('DB_HOST'),
      port: +this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASS'),
      database: this.configService.get('DB_NAME'),
      dialect: this.configService.get('DB_DIALECT'),
    };
    return {
      define: { paranoid: true, timestamps: true, underscored: true },
      ...databaseConfig,
      synchronize: false,
      autoLoadModels: true,
      logging: (e) => Logger.log(e),
    };
  }
}
