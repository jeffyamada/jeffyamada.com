import { Canvas, ThreeElements } from '@react-three/fiber';
import { useRef } from 'react';
import CameraSettings from './CameraSettings';
// import Signature from '../Signature';
// import { extend } from '@react-three/fiber';

// import { MeshLine, MeshLineMaterial } from 'three.meshline';
import styled from 'styled-components';
// import ThreeGrid from '../Grid';
import MaskedText from '../three/MaskedText';

// extend({ MeshLine, MeshLineMaterial });

export type ThreeCanvasProps = {
  children?: React.ReactNode;
};

const ThreeDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: black;
`;

const ThreeCanvas = ({ children }: ThreeCanvasProps) => {
  const dpr = global?.window?.devicePixelRatio || 1;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <ThreeDiv>
      <Canvas dpr={[dpr, dpr]} ref={canvasRef}>
        <CameraSettings />
        {children}
      </Canvas>
    </ThreeDiv>
  );
};

export default ThreeCanvas;
