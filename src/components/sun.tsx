import { rawData, sphereObjectParams } from '../types/types.ts'

export function Sun({ sunParams }: { sunParams: sphereObjectParams }) 
{
   return (
      <mesh key = { "sun" } position = {[0, 0, 0]}>
         <sphereGeometry args = {[sunParams.volumetricMeanRadiusKm, 64, 64]} />
         <meshBasicMaterial color = "red" />
      </mesh>
   ); 
}

