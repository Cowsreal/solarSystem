import { useRef, useState } from 'react' 
import { useFrame, useLoader } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

import { sphereObjectParams } from '../types/types.ts'
import { Moons } from '../components/moons.tsx'

export function PlanetObject({ planetParams, sunParams, moonParams }: { planetParams: sphereObjectParams, sunParams: sphereObjectParams, moonParams: sphereObjectParams[] })
{
   const texture = useLoader(THREE.TextureLoader, planetParams.texture);

   const a = planetParams.semimajorAxis10_6Km || 0;
   const e = planetParams.orbitEccentricity || 0;
   const i = THREE.MathUtils.degToRad(planetParams.orbitInclinationDeg || 0);

   const planetRef = useRef<THREE.Mesh>(null);
   const groupRef = useRef<THREE.Group>(null);
   const positionRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
   const currAngle = useRef(Math.random() * Math.PI * 2);

   // Line from Sun to Planet
   const [linePoints, setLinePoints] = useState<THREE.Vector3[]>([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
   ]);

   const linePointsRef = useRef(linePoints)

   // Axial Tilt
   const axialTilt = THREE.MathUtils.degToRad(planetParams.obliquityToOrbitDeg || 0);

   const rotationSpeed = (2 * Math.PI) / (planetParams.siderealRotationPeriodHrs * 3600);

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
      // Elliptical Orbit
         
      currAngle.current += angularSpeed * delta;
      
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

      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      const y = z * Math.sin(i);
      // y = y * Math.cos(i);
      groupRef.current.position.set(x, y, z);
      const newLinePoints = [...linePointsRef.current];
      newLinePoints[1].x = x;
      newLinePoints[1].y = y;
      newLinePoints[1].z = z;
      setLinePoints(newLinePoints);
      linePointsRef.current = newLinePoints;

      // Rotation
      planetRef.current.rotateY(rotationSpeed * delta * 7e4);
      // groupRef.current.position.copy(planetRef.current.position);

   });

   return (
   <>
      <group ref = {groupRef} position = {[0, 0, 0]}>
         <group rotation = {[0, 0, axialTilt]}>
            <mesh key = {planetParams.name} ref = {planetRef}>
               <sphereGeometry args = {[planetParams.volumetricMeanRadiusKm, 64, 64]} />
                  {/* 轮廓  */}
               <meshStandardMaterial map = {texture} wireframe />
            </mesh>
            <Moons moonParams = {moonParams} sunParams = { sunParams } planetRadius = { planetParams.volumetricMeanRadiusKm } />
         </group>
      </group>
      <Line 
            points = {linePoints}
            color = {"yellow"}
            lineWidth = {1}
      />
   </>
   );
}
