import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '@modules/users/entities/user.entity';
import { CreateUserDto } from '@modules/users/dto/create-user.dto';
import { ExcludeAuditColumn } from '@modules/base.entity';

@Injectable()
export default class UsersService {
    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
    ) {
        //TODO::
    }

    async create(user: CreateUserDto): Promise<User> {
        return this.userRepository.create<User>({ ...user });
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne<User>({
            where: { email },
            attributes: ExcludeAuditColumn,
        });
    }

    async findOneByEmailOrFail(email: string): Promise<User | null> {
        const foundUser = await this.userRepository.findOne<User>({
            where: { email },
            attributes: ExcludeAuditColumn,
        });

        if (!foundUser) {
            throw new NotFoundException(`The user does not exist with this email ${email}`);
        }
        return foundUser;
    }

    async findOneById(id: number): Promise<User | null> {
        return this.userRepository.findOne<User>({
            where: { userId: id },
            attributes: ExcludeAuditColumn,
        });
    }

    async findOneByIdOrFail(id: number): Promise<User | null> {
        const foundUser = await this.userRepository.findOne<User>({
            where: { userId: id },
            attributes: ExcludeAuditColumn,
        });

        if (!foundUser) {
            throw new NotFoundException('The user does not exist');
        }

        return foundUser;
    }

    async updatePassword(id: number, password: string) {
        return await this.userRepository.update<User>(
            { password },
            { where: { userId: id } },
        );
    }
}
