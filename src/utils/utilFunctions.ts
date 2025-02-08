import * as THREE from "three"
import { sphereObjectParams } from '../types/types.ts'

export function normalizeBySun(value: number, object: sphereObjectParams[])
{
   return object.map((currObj) =>
   ({
      ...currObj,
      volumetricMeanRadiusKm: (currObj.volumetricMeanRadiusKm / value) * 80,
      semimajorAxis10_6Km: ((currObj.semimajorAxis10_6Km / value) * 1e6) / 20,
   }));
}

export function generateOrbitPath(params: sphereObjectParams, center: THREE.Vector3): THREE.Vector3[]
{
   const a = params.semimajorAxis10_6Km || 0;
   const e = params.orbitEccentricity || 0;
   const i = THREE.MathUtils.degToRad(params.orbitInclinationDeg || 0);

   const points = [];
   for(let theta = 0; theta <= 2 * Math.PI; theta += 0.05)
   {
      const r = (a * (1 - e ** 2)) / (1 + e * Math.cos(theta));
      let x = r * Math.cos(theta) + center.x;
      let z = r * Math.sin(theta) + center.z;
      let y = z * Math.sin(i) + center.y;
      // y = y * Math.cos(i);
      points.push(new THREE.Vector3(x, y, z));
   }
   points.push(points[0]);
   return points;
}

export function normalizeMoonParams(sunRad: number, planRad: number, object: sphereObjectParams[])
{
   const newObject: sphereObjectParams[] = normalizeBySun(sunRad, object);
   let offs = planRad * 0.1;
   return newObject.map((currObj) =>
   {
      const updatedObject = {
      ...currObj,
      semimajorAxis10_6Km: currObj.semimajorAxis10_6Km + planRad + offs,
      };
      offs += planRad * 0.1;
      return updatedObject;
   });
}
