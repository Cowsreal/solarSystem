import { useState, useEffect } from 'react'
import { rawData, sphereObjectParams } from '../types/types.ts'

export async function useReadData(path: string)
{
   const response = await fetch(path);
   const result = await response.json();

   const planetArray= Object.keys(result).map((key) =>
   ({
      name: key,
      ...result[key],
   }));

   return planetArray;
};
