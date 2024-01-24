import { Body, Controller, Get, Post } from '@nestjs/common';
import { LotteryService } from './lottery.service';
import { WinnerDTO } from './winner.dto';

@Controller('lottery')
export class LotteryController {
  constructor(private readonly lotteryService: LotteryService) {}

  @Get('winner')
  async getWinner(): Promise<string> {
    const winner = await this.lotteryService.getWinner();

    return winner;
  }

  @Post('winner')
  postWinner(@Body() winnerDTO: WinnerDTO): string {
    return 'Posted ' + winnerDTO.name;
  }
}
