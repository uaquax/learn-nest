import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Number } from './typeorm/entities/Number';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { NumbersModule } from './numbers/numbers.module';
import { Session } from './typeorm/entities/Session';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'learn_nestjs',
      entities: [User, Number, Session],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PassportModule.register({
      session: true,
    }),
    NumbersModule,
  ],
})
export class AppModule {}
