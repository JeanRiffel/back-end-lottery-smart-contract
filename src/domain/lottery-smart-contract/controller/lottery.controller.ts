import { Body, Controller, HttpException, Get, Post, Res } from '@nestjs/common';
import { LotteryService } from '../service/lottery.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('lottery')
@ApiTags('lottery') 
export class LotteryController {
  constructor(private readonly lotteryService: LotteryService) {}

  @Post('place-bet')
  async placeBet(@Res() response: Response, @Body() data: any) {
    try {
      const players = data.data
      const result = await this.lotteryService.placeBet(players);
      const obj = { playersIncluded: result };
      return response.status(200).json(obj);
    } catch (error) {
      return response.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  }
  
  @Get('winner')
  @ApiOperation({ summary: 'Retrieve a winner' })
  @ApiResponse({ status: 200, description: 'a winner' })
  async pickWinner(@Res() response: Response ) {
    try{
      const winner = await this.lotteryService.pickWinner();
      const obj = {winnerPlayer: winner}
      response.status(200).json(obj);
    }catch( error ){
      return response.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  }

  @Get('contract-name')
  async getContractName(@Res() response: Response) {
    try {
      const contractName = await this.lotteryService.getContractName();
      const result = {
        contractName: contractName
      }
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({ message: 'Something went wrong', error: error.message });
    }      
  }

  @Get('players')
  async getPlayers(@Res() response: Response) {
    try {    
      const players = await this.lotteryService.getPlayers();
      
      const result = {
        playersList: players
      }
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({ message: 'Something went wrong', error: error.message });
    }     
  }
}
