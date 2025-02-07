// import { MyCanvas } from './components/myCanvas.tsx'
import { SolarSystem } from './components/solarSystem.tsx'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { AmbientLight } from 'three'

function App() 
{

   return ( 
   <>
      {/* <MyCanvas /> */}
      <Canvas camera = {{
         fov: 45,
         near: 0.1,
         far: 100000,
         position: [0, 0, 50]
      }}>
         <ambientLight intensity = {1} />
         <OrbitControls target = {[0, 0, 0]}/>
         <SolarSystem />
      </Canvas>
   </>);
}

export default App
