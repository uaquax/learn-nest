import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  async validate(username: string, password: string) {
    const userDb = await this.userService.findUserByUsername(username);
    if (userDb && comparePasswords(password, userDb.password)){
        return userDb;
    }
    return null;
  }
}
