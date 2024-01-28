import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppModule } from './General/app.module';
import { LotteryModule } from './domain/LotterySmartContract/module/lotery.module';
import * as cors from 'cors';

@Module({
  imports: [AppModule, LotteryModule],
})
export class GeneralModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors({ origin: 'http://localhost:3000' })).forRoutes('*');
  }
}
