import { Body, Controller, Get, Post } from '@nestjs/common';
import { LotteryService } from '../service/lottery.service';
import { WinnerDTO } from '../dto/winner.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Bet } from '../entity/Bet';

@Controller('lottery')
@ApiTags('lottery') 
export class LotteryController {
  constructor(private readonly lotteryService: LotteryService) {}

  @Get('winner')
  @ApiOperation({ summary: 'Retrieve a winner' })
  @ApiResponse({ status: 200, description: 'a winner' })
  async pickWinner(): Promise<string> {
    const winner = await this.lotteryService.pickWinner();

    return winner;
  }

  @Post('winner')
  postWinner(@Body() winnerDTO: WinnerDTO): string {
    return 'Posted ' + winnerDTO.name;
  }

  @Post('place-bet')
  async placeBet(@Body() bet: Bet): Promise<string>{
    const result = await this.lotteryService.placeBet(bet);
    return result;
  }

  @Get('contract-name')
  async getContractName(): Promise<string> {
    const contractName = await this.lotteryService.getContractName();
    return contractName;
  }

  @Get('players')
  async getPlayers(): Promise<string> {
    const contractName = await this.lotteryService.getPlayers();
    return contractName;
  }

}
