import {
  Controller,
  Get,
  Param,
  ParseFloatPipe,
  Query,
  UseGuards,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { NumbersService } from 'src/numbers/services/numbers/numbers.service';
import { AuthenticatedGuard } from 'src/utils/LocalAuthGuard';
import { Number } from 'src/typeorm/entities/Number';

@Controller('numbers')
export class NumbersController {
  constructor(private numbersService: NumbersService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  async getNumbers(
    @Query('offset') offset,
    @Query('limit') limit,
  ): Promise<Number[]> {
    const offsetNumber = parseInt(offset);
    const limitNumber = parseInt(limit);

    if (isNaN(offsetNumber) || isNaN(limitNumber)) {
      throw new BadRequestException('Invalid offset or limit value');
    }

    const numbers = await this.numbersService.getNumbers(offsetNumber, limitNumber);
    return numbers;
  }
}
