export type sphereObjectParams = 
{
   name: string;
   mass10_24Kg?: number;
   volume10_10Km3?: number;
   equatorialRadiusKm?: number;
   polarRadiusKm?: number;
   volumetricMeanRadiusKm: number;
   coreRadiusKm?: number;
   ellipticityFlattening?: number;
   meanDensityKgM3?: number;
   surfaceGravityMS2?: number;
   surfaceAccelerationMS2?: number;
   escapeVelocityKmS?: number;
   gMX10_6Km3S2?: number;
   bondAlbedo?: number;
   geometricAlbedo?: number;
   vBandMagnitudeV10?: number;
   solarIrradianceWM2?: number;
   blackBodyTemperatureK?: number;
   topographicRangeKm?: number;
   momentOfInertiaIMR2?: number; 
   j2X106?: number;
   numberOfNaturalSatellites?: number;
   planetaryRingSystem?: boolean; 
   semimajorAxis10_6Km: number;
   siderealOrbitPeriodDays?: number;
   tropicalOrbitPeriodDays?: number;
   perihelion10_6Km?: number;
   aphelion10_6Km?: number;
   synodicPeriodDays?: number;
   meanOrbitalVelocityKmS?: number;
   maxOrbitalVelocityKmS?: number;
   minOrbitalVelocityKmS?: number;
   orbitInclinationDeg?: number;
   orbitEccentricity?: number;
   siderealRotationPeriodHrs?: number;
   lengthOfDayHrs?: number;
   obliquityToOrbitDeg?: number;
   inclinationOfEquatorDeg?: number;
   texture: string;
};

export function createDefaultSphereObjectParams(): sphereObjectParams[]
{
   return Array.from({length: 1 }, () => ({
      name: "NULL",
      mass10_24Kg: 0,
      volume10_10Km3: 0,
      equatorialRadiusKm: 0, 
      polarRadiusKm: 0, 
      volumetricMeanRadiusKm: 0, 
      coreRadiusKm: 0, 
      ellipticityFlattening: 0, 
      meanDensityKgM3: 0, 
      surfaceGravityMS2: 0, 
      surfaceAccelerationMS2: 0, 
      escapeVelocityKmS: 0,
      gMX10_6Km3S2: 0,
      bondAlbedo: 0, 
      geometricAlbedo: 0,
      vBandMagnitudeV10: 0,
      solarIrradianceWM2: 0,
      blackBodyTemperatureK: 0,
      topographicRangeKm: 0,
      momentOfInertiaIMR2: 0,
      j2X106: 0,
      numberOfNaturalSatellites: 0,
      planetaryRingSystem: false,
      semimajorAxis10_6Km: 0, 
      siderealOrbitPeriodDays: 0,
      tropicalOrbitPeriodDays: 0,
      perihelion10_6Km: 0,
      aphelion10_6Km: 0,
      synodicPeriodDays: 0,
      meanOrbitalVelocityKmS: 0,
      maxOrbitalVelocityKmS: 0,
      minOrbitalVelocityKmS: 0,
      orbitInclinationDeg: 0,
      orbitEccentricity: 0,
      siderealRotationPeriodHrs: 0,
      lengthOfDayHrs: 0,
      obliquityToOrbitDeg: 0,
      inclinationOfEquatorDeg: 0,
      texture: "NULL"
   }));
};

export type moons = 
{
   [planet: string]: sphereObjectParams[];
};

export type rawData = 
{
   [key: string]: sphereObjectParams;
};
