import { useEffect, useState } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

import { PlanetObject } from '../objects/planetObject.tsx'
import { sphereObjectParams } from '../types/types.ts'
import { generateOrbitPath } from '../utils/utilFunctions.ts'

export function Planets({ planetParams, sunParams }: {planetParams: sphereObjectParams[], sunParams: sphereObjectParams}) 
{
   const [orbitPoints, setOrbitPoints] = useState<THREE.Vector3[][]>(
      new Array(planetParams.length).fill([0, 0, 0])
   );

   useEffect(() =>
   {
      const myOrbitPoints = planetParams.map((planet) =>
      {
         return generateOrbitPath(planet);
      });
      setOrbitPoints(myOrbitPoints);
   }, [planetParams]);

   if(orbitPoints.length === 0)
   return null; 

   return (
      <>
      {
         planetParams.map((planet, index) =>
         {
            return ( 
               <>
               <PlanetObject key = {planet.name} planetParams = { planet } sunParams = { sunParams } orbitPoints = { orbitPoints[index] }/>
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

