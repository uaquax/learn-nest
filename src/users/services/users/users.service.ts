import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SerializedUser, User } from 'src/typeorm/entities/User';
import { CreaetUserNumberParams, CreaetUserParams } from 'src/utils/types';
import { Number } from 'src/typeorm/entities/Number';
import { plainToClass } from 'class-transformer';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Number) private numberRepository: Repository<Number>,
  ) {}

  getUser(id: number): SerializedUser {
    return plainToClass(SerializedUser, this.userRepository.findOneBy({ id }));
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  findUserById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  createUser(userParams: CreaetUserParams): SerializedUser {
    const password = encodePassword(userParams.password);
    const user = this.userRepository.create({
      ...userParams,
      createdAt: new Date(),
      password: password,
    });
    return plainToClass(SerializedUser, this.userRepository.save(user));
  }

  async createUserNumber(id: number, userNumberParams: CreaetUserNumberParams) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const number = this.numberRepository.create(userNumberParams);
    user.number = await this.numberRepository.save(number);

    return this.userRepository.save(user);
  }
}
