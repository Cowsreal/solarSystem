import { useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

import { sphereObjectParams } from '../types/types.ts'
import { generateOrbitPath, normalizeMoonParams } from '../utils/utilFunctions.ts'

export function Moons({ moonParams, sunParams, planetRadius }: { moonParams: sphereObjectParams[], sunParams: sphereObjectParams, planetRadius: number })
{
   const [orbitPoints, setOrbitPoints] = useState<THREE.Vector3[][]>([]);
   const [initialized, setInitialized] = useState(false);
   const [newMoonParams, setNewMoonParams] = useState<sphereObjectParams[]>([]);

   useFrame(() =>
   {
      if(!newMoonParams)
         return;
      const myOrbitPoints = newMoonParams.map((moon) =>
      {
               // console.log(moonParams)
         return generateOrbitPath(moon, new THREE.Vector3(0, 0, 0));
      });
      setOrbitPoints([...myOrbitPoints]);
   });

   useEffect(() =>
   {
      if(!moonParams)
         return;
      setNewMoonParams(normalizeMoonParams(sunParams.volumetricMeanRadiusKm, planetRadius, moonParams));
         // console.log(moonParams)
      setInitialized(true);

   }, [moonParams])

   if(orbitPoints.length === 0 || !moonParams || !initialized)
   return null; 

   return (
      <>
      {
         moonParams.map((moon, index) =>
         {
                  // console.log(orbitPoints)
            return ( 
               <>
               {/* <MoonObject key = {planet.name} planetParams = { planet } sunParams = { sunParams } /> */}
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
