import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraSettings from 'components/ThreeCanvas/CameraSettings';
import styled from 'styled-components';
import DiagonalText from '@/components/three/DiagonalText';
import ColumnMasks from '../ColumnMasks';

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

const DiagonalTextStory = {
  title: 'Three/DiagonalText',
  component: DiagonalText,
};

const Template = () => {
  const dpr = global?.window?.devicePixelRatio || 1;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <ThreeDiv>
      <Canvas dpr={[dpr, dpr]} ref={canvasRef}>
        <CameraSettings />
        <ColumnMasks startIndex={20} columns={10} />
        <DiagonalText
          text="Thanks For Lunch"
          columns={10}
          startMaskIndex={20}
          start={0}
          end={100}
        />
      </Canvas>
    </ThreeDiv>
  );
};

export const Default = Template.bind({});

export default DiagonalTextStory;
