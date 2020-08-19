export class AssetInfo {
  private powerRange: PowerRange;

  constructor(
    private readonly assetId: string,
    private readonly devicesCount: number,
    powerLow: number,
    powerHigh: number,
  ) {
    this.powerRange = new PowerRange(powerLow, powerHigh);
  }

  getAssetId(): string {
    return this.assetId;
  }

  getDevicesCount(): number {
    return this.devicesCount;
  }

  getPowerRange(): PowerRange {
    return this.powerRange;
  }

  updatePowerRange(powerLow: number, powerHigh: number): void {
    const effectivePowerLow =
      powerLow !== null ? powerLow : this.powerRange.getPowerLow();
    const effectivePowerHigh =
      powerHigh !== null ? powerHigh : this.powerRange.getPowerHigh();
    this.powerRange = new PowerRange(effectivePowerLow, effectivePowerHigh);
  }

  randomPower(): number {
    return this.powerRange.randomPower();
  }
}

export class PowerRange {
  constructor(
    private readonly powerLow: number,
    private readonly powerHigh: number,
  ) {}

  getPowerLow(): number {
    return this.powerLow;
  }

  getPowerHigh(): number {
    return this.powerHigh;
  }

  randomPower(): number {
    const delta = this.powerHigh - this.powerLow;
    return this.powerLow + Math.random() * delta;
  }
}
