import { Canvas } from '@react-three/fiber'

export function MyCanvas()
{
   return (
      <Canvas camera = {{
         fov: 45,
         near: 0.1,
         far: 1000,
         position: [0, 0, 0]
      }}/>
   );
}

