import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LotteryModule } from './domain/lottery-smart-contract/module/lotery.module';
import * as cors from 'cors';

@Module({
  imports: [LotteryModule],
})
export class GeneralModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors({ origin: process.env.FRONT_END_ADDRESS})).forRoutes('*');
  }
}
