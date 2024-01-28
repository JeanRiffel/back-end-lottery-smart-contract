import { Module } from '@nestjs/common';
import { LotteryController } from '../controller/lottery.controller';
import { LotteryService } from '../service/lottery.service';

@Module({
  imports: [],
  controllers: [LotteryController],
  providers: [LotteryService],
})
export class LotteryModule {}
