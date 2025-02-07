import { useRef } from 'react' 
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'

import { sphereObjectParams } from '../types/types.ts'

export function PlanetObject({ planetParams, sunParams, orbitPoints }: { planetParams: sphereObjectParams, sunParams: sphereObjectParams, orbitPoints: THREE.Vector3[] })
{
   const texture = useLoader(THREE.TextureLoader, planetParams?.texture);
   const a = planetParams.semimajorAxis10_6Km || 0;
   const e = planetParams.orbitEccentricity || 0;
   const i = THREE.MathUtils.degToRad(planetParams.orbitInclinationDeg || 0);

   const planetRef = useRef<THREE.Mesh>(null);
   let currAngle = 0.0;

   // Gravitational Constant
   const G = 6.67430e-11 / (4 / 3 * Math.PI * sunParams.volumetricMeanRadiusKm ** 3);
   // Solar Mass
   const M = 1.989e30;

   // Orbital period approximation for current planet for elliptical orbits
   const T = Math.sqrt((4 * Math.PI ** 2 * a ** 3) / (G * M));

   const angularSpeed = (2 * Math.PI) / T;

   const getRadialVelocity = (r: number, e: number, angle: number) =>
   {
      return (Math.sqrt(G * M ) / r) * ((1 - e ** 2) / (1 + e * Math.cos(angle)) ** 1.5);
   }

   useFrame((state, delta) =>
   {
      const r = (a * (1 - e ** 2)) / (1 + e * Math.cos(currAngle));
      const vR = getRadialVelocity(r, e, currAngle);
      const deltaAngle = vR / r;

      currAngle += deltaAngle * delta / 10000000; 

      let x = r * Math.cos(currAngle);
      let z = r * Math.sin(currAngle);
      let y = z * Math.sin(i);
      y = y * Math.cos(i);
      planetRef.current.position.set(x, y, z);
   });

   return (
      <mesh key = {planetParams.name} ref = {planetRef} position = {orbitPoints[0]}>
         <sphereGeometry args = {[planetParams.volumetricMeanRadiusKm, 64, 64]} />
         <meshStandardMaterial map = {texture} />
      </mesh>
   );
}
