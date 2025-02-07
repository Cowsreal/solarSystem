export type sphereObjectParams = 
{
   name: string;
   mass10_24Kg?: number;
   volume10_10Km3?: number;
   equatorialRadiusKm?: number;
   polarRadiusKm?: number;
   volumetricMeanRadiusKm?: number;
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
   semimajorAxis10_6Km?: number;
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
   texture?: string;
};

export type rawData = 
{
   [key: string]: sphereObjectParams;
};
