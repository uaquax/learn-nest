import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from 'src/users/services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/utils/LocalStrategy';
import { SessionSerializer } from 'src/utils/SessionSerializer';
import { Session } from '../typeorm/entities/Session';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Session, Number])
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService
    },
    LocalStrategy,
    SessionSerializer
  ]
})
export class AuthModule {}
