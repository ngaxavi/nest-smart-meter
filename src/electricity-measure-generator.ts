import { generatorConfig } from './app.config';
import { Observable } from 'rxjs';
import { ElectricityMeasureDataGenerator } from './electricity-measure-data-generator';
import {
  ElectricityMeasureGeneratorProperties,
  Asset,
} from './electricity-measure-generator-properties';
import { AssetInfo } from './asset-info';
import { ElectricityMeasure } from './electricity-measure';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ElectricityMeasureGenerator {
  private assets = new Map();
  private periodicity = 10000;

  constructor() {
    const resMap = new Map<string, Asset>();

    for (const asset of generatorConfig.assets) {
      resMap.set(
        asset.id,
        new Asset(
          asset.id,
          asset.devicesCount,
          asset.powerLow,
          asset.powerHigh,
        ),
      );
    }

    const properties = new ElectricityMeasureGeneratorProperties(10000, resMap);

    this.assets = this.extractConfiguration(properties);
    this.periodicity = properties.periodicity || 10000;
  }

  getAssets(): Map<string, AssetInfo> {
    return this.assets;
  }

  updatePowerRangeFor(
    assetId: string,
    powerLow: number,
    powerHigh: number,
  ): void {
    const assetInfo: AssetInfo = this.assets.get(assetId);
    if (assetInfo === null) {
      console.log('Asset with id ' + assetId + ' does not exist');
    }
    assetInfo.updatePowerRange(powerLow, powerHigh);
  }

  generateSensorData(): Map<string, Observable<string>> {
    console.log('generate sensor');
    const result = new Map<string, Observable<string>>();
    this.assets.forEach((asset, id) => {
      const generator = new ElectricityMeasureDataGenerator(
        this.periodicity,
        asset,
      );
      result.set(id, generator.sensorData());
    });

    return result;
  }

  extractConfiguration(
    properties: ElectricityMeasureGeneratorProperties,
  ): Map<string, AssetInfo> {
    const assets = new Map<string, AssetInfo>();

    properties.assets.forEach((asset: Asset, id: string) =>
      assets.set(
        id,
        new AssetInfo(id, asset.devicesCount, asset.powerLow, asset.powerHigh),
      ),
    );

    return assets;
  }
}
