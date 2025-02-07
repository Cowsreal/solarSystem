import { useRef } from 'react' 
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'

import { sphereObjectParams } from '../types/types.ts'

export function PlanetObject({ planetParams, sunParams, orbitPoints }: { planetParams: sphereObjectParams, sunParams: sphereObjectParams, orbitPoints: THREE.Vector3[] })
{
   const texture = useLoader(THREE.TextureLoader, planetParams.texture);

   const a = planetParams.semimajorAxis10_6Km || 0;
   const e = planetParams.orbitEccentricity || 0;
   const i = THREE.MathUtils.degToRad(planetParams.orbitInclinationDeg || 0);

   const planetRef = useRef<THREE.Mesh>(null);
   const currAngle = useRef(0);

   // Gravitational Constant
   const G = 6.67430e-11 / (4 / 3 * Math.PI * sunParams?.volumetricMeanRadiusKm ** 3);
   // Solar Mass
   const M = 1.989e30 / 1e24;

   // Orbital period approximation for current planet for elliptical orbits
   const T = Math.sqrt(a ** 3);
   const angularSpeed = (2 * Math.PI) / T;

   const getRadialVelocity = (r: number, e: number, angle: number) =>
   {
      return (Math.sqrt(G * M ) / r) * ((1 - e ** 2) / (1 + e * Math.cos(angle)) ** 1.5);
   }

   useFrame((state, delta) =>
   {
      currAngle.current += angularSpeed * delta * 10;
      
      // Anomaly
      let E = currAngle.current;
      for(let i = 0; i < 5; i++)
      {
         // Newton's
         E = currAngle.current + e * Math.sin(E);
      }

      const theta = 2 * Math.atan2(
         Math.sqrt(1 + e) * Math.sin(E / 2),
         Math.sqrt(1 - e) * Math.cos(E / 2)
      );

      const r = (a * (1 - e ** 2)) / (1 + e * Math.cos(theta));

      let x = r * Math.cos(theta);
      let z = r * Math.sin(theta);
      let y = z * Math.sin(i);
      // y = y * Math.cos(i);
      planetRef.current.position.set(x, y, z);
   });


   if(!orbitPoints)
{
      return <></>
   }

   return (
      <mesh key = {planetParams.name} ref = {planetRef} position = {orbitPoints[0]}>
         <sphereGeometry args = {[planetParams.volumetricMeanRadiusKm, 64, 64]} />
         <meshStandardMaterial map = {texture} />
      </mesh>
   );
}
