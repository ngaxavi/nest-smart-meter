import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
  ValidateNested,
  IsString,
} from 'class-validator';

export class ElectricityMeasureGeneratorProperties {
  @IsInt()
  @Min(5)
  @Max(60)
  periodicity: number;

  @ValidateNested()
  assets: Map<string, Asset>;

  constructor(periodicity: number, assets: Map<string, Asset>) {
    this.periodicity = periodicity;
    this.assets = assets;
  }
}

export class Asset {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsInt()
  @Min(10)
  devicesCount: number;

  @IsNumber()
  @IsOptional()
  powerLow?: number;

  @IsNumber()
  @IsOptional()
  powerHigh?: number;

  constructor(
    id: string,
    devicesCount: number,
    powerLow?: number,
    powerHigh?: number,
  ) {
    this.id = id;
    this.devicesCount = devicesCount;
    this.powerLow = powerLow || 2000;
    this.powerHigh = powerHigh || 4000;
  }
}
