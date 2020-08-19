interface GeneratorConfig {
  assets: AssetConfig[];
}

interface AssetConfig {
  id: string;
  devicesCount: number;
  powerLow?: number;
  powerHigh?: number;
}

export const generatorConfig: GeneratorConfig = {
  assets: [
    {
      id: 'qa2',
      devicesCount: 50,
    },
    {
      id: 'qa3',
      devicesCount: 60,
    },
    {
      id: 'qw2',
      devicesCount: 50,
      powerLow: 4000,
      powerHigh: 6000,
    },
  ],
};
