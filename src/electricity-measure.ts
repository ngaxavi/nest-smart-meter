export class ElectricityMeasure {
  constructor(
    private readonly deviceId: string,
    private readonly assetId: string,
    private readonly timestamp: number,
    private readonly power: number,
  ) {}

  getDeviceId(): string {
    return this.deviceId;
  }

  getAssetId(): string {
    return this.assetId;
  }
}
