// import { MyCanvas } from './components/myCanvas.tsx'
import { SolarSystem } from './components/solarSystem.tsx'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function App() 
{


   return ( 
   <>
      {/* <MyCanvas /> */}
      <Canvas camera = {{
         fov: 45,
         near: 0.1,
         far: 100000,
         position: [0, 50, 100]
      }}>
         <ambientLight intensity = {3} />
         <OrbitControls target = {[0, 0, 0]}/>
         <SolarSystem />
      </Canvas>
   </>);
}

export default App
