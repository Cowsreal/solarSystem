import { useEffect, useState } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

import { PlanetObject } from '../objects/planetObject.tsx'
import { sphereObjectParams, moons } from '../types/types.ts'
import { generateOrbitPath, normalizeBySun } from '../utils/utilFunctions.ts'
import moonJson from '../data/moons.json'

export function Planets({ planetParams, sunParams }: {planetParams: sphereObjectParams[], sunParams: sphereObjectParams}) 
{
   const [orbitPoints, setOrbitPoints] = useState<THREE.Vector3[][]>(
      new Array(1).fill(new THREE.Vector3(0, 0, 0))
   );

   const [moonParams, setMoonParams] = useState<moons>(null);

   useEffect(() =>
   {
      const myOrbitPoints = planetParams.map((planet) =>
      {
         return generateOrbitPath(planet, new THREE.Vector3(0, 0, 0));
      });
      setOrbitPoints(myOrbitPoints);

      // Get moons
      const moonData: moons = moonJson;
      setMoonParams(moonData);
   }, [planetParams]);

   if(orbitPoints.length === 1 || !moonParams) 
      return null; 

   return (
      <>
      {
         planetParams.map((planet, index) =>
         {
            const planetName = planet.name;
            return ( 
               <>
               <PlanetObject key = {planetName} planetParams = { planet } sunParams = { sunParams } moonParams = { moonParams[planetName] } />
               <Line 
                  points = {orbitPoints[index]}
                  color = {"white"}
                  lineWidth = {1}
               />
               </>);
         })
      }
      </>
   ); 
}

