import React, { useEffect, useRef, useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import CameraSettings from 'components/ThreeCanvas/CameraSettings';
// import styled from 'styled-components';
import Letters from '@/components/Letters';
import _ from 'lodash';

export interface StoryProps {
  // open?: boolean;
}

const LettersStory = {
  title: 'components/Letters',
  component: Letters,
  layout: 'fullscreen',
  decorators: [
    Story => {
      const [isLoaded, setIsLoaded] = useState(false);
      useEffect(() => {
        const script = document.createElement('script');
        script.onload = () => {
          console.log('SCRIPT LOADED');
          setIsLoaded(true);
        };
        script.src =
          'https://cdn.jsdelivr.net/npm/pathseg@1.2.0/pathseg.min.js';
        document.body.appendChild(script);
        return () => {
          // clean up effects of script here
        };
      }, []);

      return isLoaded ? <Story /> : <div>Loading...</div>;
    },
  ],
};

const Template = () => {
  const dpr = global?.window?.devicePixelRatio || 1;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <script src="/files/lib/pathseg.min.js" />
      <Letters />
    </>
  );
};

export const Default = Template.bind({});

export default LettersStory;
