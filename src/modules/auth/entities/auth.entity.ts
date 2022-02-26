import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'nestjs-redis';

import { Redis } from 'ioredis';

@Injectable()
export default class AuthEntity {
    private readonly redisClient: Redis;

    constructor(private readonly redisService: RedisService, private configService: ConfigService) {
        this.redisClient = this.redisService.getClient();
    }

    async addRefreshToken(email: string, token: string): Promise<void> {
        await this.redisClient.set(email, token, 'EX', this.configService.get('TOKEN_EXPIRATION_TIME'));
    }

    async addVerificationToken(email: string, token: string): Promise<void> {
        await this.redisClient.set(`verified_${email}`, token, 'EX', this.configService.get('VERIFICATION_TOKEN_EXPIRATION_TIME'));
    }

    async getVerificationToken(key: string): Promise<string | null> {
        return this.redisClient.get(`verified_${key}`);
    }

    async getToken(key: string): Promise<string | null> {
        return this.redisClient.get(key);
    }

    removeToken(key: string): Promise<number> {
        return this.redisClient.del(key);
    }

    removeAllTokens(): Promise<string> {
        return this.redisClient.flushall();
    }
}
