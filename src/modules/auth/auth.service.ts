import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import UsersService from '../users/users.service';

@Injectable()
export default class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    return null;
  }
}
