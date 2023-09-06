import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraSettings from 'components/ThreeCanvas/CameraSettings';
import Stroke from 'components/Signature2/Stroke';
import styled from 'styled-components';
import jeffSignature from 'components/Signature2/jeff-signature.json';
import ThreeGrid from '@/components/Grid';

export interface StoryProps {
  // open?: boolean;
}

const ThreeDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: white;
`;

const StrokeStory = {
  title: 'Three/ThreeGrid',
  component: Stroke,
};

const Template = () => {
  const dpr = global?.window?.devicePixelRatio || 1;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // const points = [
  //   { x: -300, y: -100, t: 0 },
  //   { x: -200, y: 350, t: 0 },
  //   { x: -100, y: 0, t: 0 },
  //   { x: 0, y: 20, t: 0 },
  //   { x: 100, y: 400, t: 0 },
  //   { x: 200, y: 0, t: 0 },
  //   { x: 300, y: -100, t: 0 },
  // ];

  // console.log('jeffSignature.strokes:', jeffSignature.strokes[0]);
  const points = jeffSignature.strokes[0];

  return (
    <ThreeDiv>
      <Canvas dpr={[dpr, dpr]} ref={canvasRef}>
        <CameraSettings />
        <ThreeGrid />
      </Canvas>
    </ThreeDiv>
  );
};

export const Default = Template.bind({});
// Default.args = {
//   points: [
//     { x: 0, y: 0, t: 0 },
//     { x: 100, y: 100, t: 0 },
//     { x: 200, y: 100, t: 0 },
//     { x: 300, y: 200, t: 0 },
//     { x: 400, y: 200, t: 0 },
//     { x: 500, y: 100, t: 0 },
//     { x: 600, y: 0, t: 0 },
//   ],
// };

export default StrokeStory;
