import { generatorConfig } from './app.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as EventSource from 'eventsource';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  Logger.log(`app is running on port 3000`);

  readData();
}
bootstrap();

function readData() {
  const nbDevices = generatorConfig.assets
    .map(asset => asset.devicesCount)
    .reduce((a, b) => a + b, 0);
  console.log(nbDevices);
  const eventSource = new EventSource(
    'http://localhost:3000/measures/firehose',
  );

  let i = 0;

  let result = [];

  eventSource.onmessage = event => {
    if (event.data) {
      i++;
      result.push(JSON.parse(event.data));
    }

    if (i === nbDevices) {
      i = 0;
      console.log(result.length);
      result = [];
    }
    // console.log(JSON.parse(event.data));
  };
}
