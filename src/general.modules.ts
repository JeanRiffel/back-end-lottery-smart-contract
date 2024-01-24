import { Module } from '@nestjs/common';
import { AppModule } from './General/app.module';
import { LotteryModule } from './LotterySmartContract/lotery.module';

@Module({
  imports: [AppModule, LotteryModule],
})
export class GeneralModule {}
