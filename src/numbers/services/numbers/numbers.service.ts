import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Number } from 'src/typeorm/entities/Number';

@Injectable()
export class NumbersService {
  constructor(
    @InjectRepository(Number) private numberRepository: Repository<Number>,
  ) {}
  async getNumbers(offset: number, limit: number): Promise<Number[]> {
    const numbers = await this.numberRepository.find({
        skip: offset,
        take: limit
    });
    return numbers;
  }
}
