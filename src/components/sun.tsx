import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { sphereObjectParams } from '../types/types.ts'

export function Sun({ sunParams }: { sunParams: sphereObjectParams }) 
{
   const texture = useLoader(THREE.TextureLoader, sunParams.texture);
   return (
      <mesh key = { "sun" } position = {[0, 0, 0]}>
         <sphereGeometry args = {[1, 64, 64]} />
         <meshStandardMaterial map = {texture} />
      </mesh>
   ); 
}

