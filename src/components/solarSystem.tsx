import { useEffect, useState } from "react"

import { useReadData } from '../utils/readData.ts'
import { sphereObjectParams, createDefaultSphereObjectParams } from '../types/types.ts'
import { Planets } from './planets.tsx'
import { Sun } from './sun.tsx'
import { normalizeBySun } from '../utils/utilFunctions.ts'

export function SolarSystem()
{
   const [sunParams, setSunParams] = useState<sphereObjectParams>(createDefaultSphereObjectParams()[0]);
   const [planetParams, setPlanetParams] = useState<sphereObjectParams[]>(createDefaultSphereObjectParams());
   const [initialized, setInitialized] = useState(false);
   const [dataFetched, setDataFetched] = useState(false);

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
      setDataFetched(true);
   }, []);

   useEffect(() =>
   {
      if(dataFetched && !initialized && sunParams !== null && planetParams !== null)
      {
         setPlanetParams(prev => prev ? normalizeBySun(sunParams.volumetricMeanRadiusKm, prev): prev);
         setSunParams(prev => prev ? {
            ...prev,
            volumetricMeanRadiusKm: prev.volumetricMeanRadiusKm / prev.volumetricMeanRadiusKm
         } : prev);

         setInitialized(true);
      }
   }, [sunParams, planetParams])

   if(!initialized)
   {
      return <></>;
   }
   else
   {
      return ( 
      <>
         <Sun sunParams = { sunParams }/>
         <Planets planetParams = { planetParams } sunParams = { sunParams }/>
      </>);
   }

}
