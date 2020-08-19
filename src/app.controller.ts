import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { Response } from 'nestjs-sse';
import { merge, Observable } from 'rxjs';
import { rxToStream } from 'rxjs-stream';
import { ElectricityMeasureGenerator } from './electricity-measure-generator';

@Controller('measures')
export class AppController {
  private content: Map<string, Observable<string>>;
  private fire: Observable<string>;

  constructor(private readonly generator: ElectricityMeasureGenerator) {
    this.content = generator.generateSensorData();
    this.fire = merge(...Array.from(this.content.values()));
  }

  @Get('firehose')
  firehose(@Res() res: Response, @Req() req: Request) {
    const stream = rxToStream(this.fire, { objectMode: true });

    stream.on('data', data => {
      res.sse(`data: ${data}\n\n`);
    });

    req.on('close', () => {
      stream.destroy();
    });
  }

  // @Get('assets/:id')
  // forAsset(@Param('id') id: string) {}
}
