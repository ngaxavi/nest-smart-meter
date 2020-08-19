import { SSEMiddleware } from 'nestjs-sse';
import { ElectricityMeasureGenerator } from './electricity-measure-generator';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ElectricityMeasureGenerator],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(SSEMiddleware).forRoutes(AppController);
  }
}
