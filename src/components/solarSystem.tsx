import { useEffect, useState } from "react"

import { rawData, sphereObjectParams, createDefaultSphereObjectParams } from '../types/types.ts'
import { Planets } from './planets.tsx'
import { Sun } from './sun.tsx'
import { normalizeBySun } from '../utils/utilFunctions.ts'
import sunJson from "../data/sun.json"
import planetsJson from "../data/data.json"

export function SolarSystem()
{
   const [sunParams, setSunParams] = useState<sphereObjectParams>(createDefaultSphereObjectParams()[0]);
   const [planetParams, setPlanetParams] = useState<sphereObjectParams[]>(createDefaultSphereObjectParams());
   const [initialized, setInitialized] = useState(false);
   const [dataFetched, setDataFetched] = useState(false);

   async function fetchSunData()
   {
      const data: rawData = sunJson;
      setSunParams(data.sun);
   };

   async function fetchPlanetData()
   {
      const data: rawData = planetsJson;
      setPlanetParams(Object.values(data));
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
