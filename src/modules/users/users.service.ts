import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '@modules/users/entities/user.entity';

@Injectable()
export default class UsersService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {}
}
