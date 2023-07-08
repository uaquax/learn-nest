import { Module } from '@nestjs/common';
import { NumbersController } from './controllers/numbers/numbers.controller';
import { NumbersService } from './services/numbers/numbers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Session } from 'inspector';
import { Number } from 'src/typeorm/entities/Number';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session, Number])],
  controllers: [NumbersController],
  providers: [NumbersService]
})
export class NumbersModule {}
