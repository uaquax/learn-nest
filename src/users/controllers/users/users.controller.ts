import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';
import { CreateUserNumberDto } from 'src/dtos/CreateUserNumber.dto';
import { AuthenticatedGuard } from 'src/utils/LocalAuthGuard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try{
        const user = await this.usersService.createUser(createUserDto);
        return user;
    }
    catch (error) {
        console.log(error);
        if (error.code === 'ER_DUP_ENTRY') {
          throw new HttpException('Username is already in use', HttpStatus.CONFLICT);
        } else {
          throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
    }
  }

  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticatedGuard)
  @Post('numbers')
  async createUserNumber(@Req() req: Request, @Body() createUserNumberDto: CreateUserNumberDto) {
    try{
        const number = this.usersService.createUserNumber(req.user["id"], createUserNumberDto);
        return number;
    }
    catch {
        throw new HttpException("", HttpStatus.BAD_REQUEST);
    }
  }
}
