import React, {
  // useCallback,
  // useContext,
  useEffect,
  useRef,
  // useState,
} from 'react';
import * as THREE from 'three';
// import { Text as TroikaText, preloadFont } from 'troika-three-text';
import InertiaPlugin from '@/lib/gsap/InertiaPlugin';

gsap.registerPlugin(InertiaPlugin);

import { useScroll } from 'framer-motion';

// import { extend, useFrame, useThree } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
// import { useControls } from 'leva';
import useScreenSize from '@/hooks/useScreenSize';
import _ from 'lodash';
import Year from './Year';
import gsap from 'gsap';
// import gsap, { Expo } from 'gsap';
// import { ScrollPageContext } from '@/components/ScrollingPage';
// import useScreenSize from '@/hooks/useScreenSize';
// import { createDerivedMaterial } from 'troika-three-utils';
// import vertexTransform from './shaders/vertexTransform.glsl';
// import fragmentColorTransform from './shaders/fragmentColorTransform.glsl';
// import defs from './shaders/defs.glsl';

type Ref = THREE.Group;

const RolledText = React.forwardRef<Ref>(({}, ref) => {
  const { screenHeight } = useScreenSize();
  const years = _.range(2012, 2025);

  const scrollTargetRef = useRef<HTMLElement>(
    document.getElementById('page-container'),
  );

  const { scrollY } = useScroll();
  const velocityRef = useRef(0);
  const scrollRef = useRef({
    y: 0,
    velocity: 0,
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    InertiaPlugin.track(scrollRef.current, 'y');
  }, []);

  useFrame(() => {
    scrollRef.current.y = scrollY.get();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const velocity = InertiaPlugin.getVelocity(scrollRef.current, 'y');
    const clamped = _.clamp(velocity * 0.0005, -0.5, 0.5);
    gsap.to(velocityRef, {
      current: clamped,
    });
  });

  const renderYears = () =>
    _.map(years, (year, i) => {
      const yearString = year.toString();
      const start = i * 800;
      const end = start + 2800;
      return (
        <Year
          text={yearString}
          start={start}
          velocity={velocityRef}
          end={end}
          key={yearString}
        />
      );
    });

  return (
    <group position={[0, -screenHeight * 0, 0]} ref={ref}>
      {renderYears()}
    </group>
  );
});

export default RolledText;
