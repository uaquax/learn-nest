import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Number } from './typeorm/entities/Number';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { NumbersModule } from './numbers/numbers.module';
import { Session } from './typeorm/entities/Session';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
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
