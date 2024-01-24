import { NestFactory } from '@nestjs/core';
import { GeneralModule } from './general.modules';

async function bootstrap() {
  const app = await NestFactory.create(GeneralModule);
  await app.listen(3001);
}
bootstrap();
