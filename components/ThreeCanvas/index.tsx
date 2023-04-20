import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import CameraSettings from './CameraSettings';
// import Signature from '../Signature';
import { extend } from '@react-three/fiber';

// import { MeshLine, MeshLineMaterial } from 'three.meshline';
import styled from 'styled-components';
import ThreeGrid from '../Grid/inde';

// extend({ MeshLine, MeshLineMaterial });

export type ThreeCanvasProps = {};

const ThreeDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: white;
`;

const ThreeCanvas = ({}: ThreeCanvasProps) => {
  const dpr = global?.window?.devicePixelRatio || 1;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <ThreeDiv>
      <Canvas dpr={[dpr, dpr]} ref={canvasRef}>
        <CameraSettings />
        {/* <Signature /> */}
        <ThreeGrid />
      </Canvas>
    </ThreeDiv>
  );
};

export default ThreeCanvas;
