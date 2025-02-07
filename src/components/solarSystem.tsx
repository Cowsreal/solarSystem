import { useEffect, useState } from "react"

import { useReadData } from '../utils/readData.ts'
import { sphereObjectParams } from '../types/types.ts'
import { Planets } from './planets.tsx'
import { Sun } from './sun.tsx'
import { normalizeBySun } from '../utils/utilFunctions.ts'

export function SolarSystem()
{
   const [sunParams, setSunParams] = useState<sphereObjectParams | null>(null);
   const [planetParams, setPlanetParams] = useState<sphereObjectParams[] | null>(null);
   const [initialized, setInitialized] = useState(false);

   async function fetchSunData()
   {
      const data = await useReadData("src/data/sun.json");
      setSunParams(data[0]);
   };

   async function fetchPlanetData()
   {
      const data = await useReadData("src/data/data.json");
      setPlanetParams(data);
   };

   useEffect(() =>
   {
      fetchSunData();
      fetchPlanetData();
   }, []);

   useEffect(() =>
   {
      if(!initialized && sunParams !== null && planetParams !== null)
      {
         setPlanetParams(prev => prev ? normalizeBySun(sunParams.volumetricMeanRadiusKm, prev): prev);
         setSunParams(prev => prev ? {
            volumetricMeanRadiusKm: prev.volumetricMeanRadiusKm / prev.volumetricMeanRadiusKm
         } : null);

         setInitialized(true);
      }
   }, [sunParams, planetParams])

   if(!initialized)
   return <></>;

   return ( 
   <>
      <Sun sunParams = { sunParams }/>
      <Planets planetParams = { planetParams } sunParams = { sunParams }/>
   </>);
}
