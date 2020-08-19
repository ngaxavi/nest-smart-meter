import { classToPlain } from 'class-transformer';
import { interval, Observable, range, Subject } from 'rxjs';
import { delay, flatMap, map, takeUntil } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { AssetInfo } from './asset-info';
import { ElectricityMeasure } from './electricity-measure';

export class ElectricityMeasureDataGenerator {
  private sensorIdPrefix: string;

  constructor(
    private readonly periodicity: number,
    private readonly assetInfo: AssetInfo,
  ) {
    this.sensorIdPrefix = uuid().substring(0, 16);
  }

  sensorData(): Observable<string> {
    const max = this.periodicity / this.assetInfo.getDevicesCount();
    const duration = 10 + Math.random() * max;
    const timeout$ = new Subject();
    return interval(this.periodicity).pipe(
      map(i => Date.now()),
      flatMap(reportTimestamp =>
        range(1, this.assetInfo.getDevicesCount()).pipe(
          map(sensorIndex =>
            this.generateMeasure(sensorIndex, reportTimestamp),
          ),
          delay(duration),
          takeUntil(timeout$),
        ),
      ),
    );
  }

  generateMeasure(sensorIndex: number, reportTimestamp: number): string {
    const measure = new ElectricityMeasure(
      this.generateSensorId(sensorIndex),
      this.assetInfo.getAssetId(),
      reportTimestamp,
      this.assetInfo.randomPower(),
    );

    return JSON.stringify(classToPlain(measure));
  }

  generateSensorId(sensorIndex: number): string {
    return `${this.sensorIdPrefix}-${sensorIndex}`;
  }
}
