import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraSettings from 'components/ThreeCanvas/CameraSettings';
import styled from 'styled-components';
import ColumnMasks from '@/components/three/ColumnMasks';

export interface StoryProps {
  // open?: boolean;
}

const ThreeDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: black;
`;

const ColumnMasksStory = {
  title: 'Three/ColumnMasks',
  component: ColumnMasks,
};

const Template = () => {
  const dpr = global?.window?.devicePixelRatio || 1;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <ThreeDiv>
      <Canvas dpr={[dpr, dpr]} ref={canvasRef}>
        <CameraSettings />
        <ColumnMasks />
      </Canvas>
    </ThreeDiv>
  );
};

export const Default = Template.bind({});

export default ColumnMasksStory;
