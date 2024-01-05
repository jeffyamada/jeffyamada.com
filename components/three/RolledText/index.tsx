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
import { CatmullRomLine } from '@react-three/drei';

type Ref = THREE.Group;

const RolledText = React.forwardRef<Ref>(({}, ref) => {
  const { screenHeight } = useScreenSize();
  const thisYear = new Date().getFullYear();
  const years = _.range(2012, thisYear + 1);

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
    const clamped = _.clamp(velocity * 0.0005, -0.25, 0.25);
    // gsap.set(velocityRef, {
    //   current: clamped,
    // });
    velocityRef.current = clamped;
  });

  const renderYears = () =>
    _.map(years, (year, i) => {
      const yearString = year.toString();
      const start = i * 800;
      const end = start + 2800;
      const outline = thisYear !== year;

      return (
        <Year
          text={yearString}
          start={start}
          velocity={velocityRef}
          end={end}
          key={yearString}
          outline={outline}
        />
      );
    });

  return (
    <group position={[0, -screenHeight * 0, 0]} ref={ref}>
      {/* <CatmullRomLine
        position={[0, 0, -500]}
        points={[
          [-250, 0, 0],
          [0, 0, 0],
          [0, 250, 0],
          [250, 250, 0],
        ]} // Array of Points
        closed={false} // Default
        curveType="catmullrom" // One of "centripetal" (default), "chordal", or "catmullrom"
        tension={0.9} // Default (only applies to "catmullrom" curveType)
        color={0xffffff}
        lineWidth={2} // In pixels (default)
        dashed={false} // Default
        // vertexColors={[[0, 0, 0], ...]} // Optional array of RGB values for each point
        // {...lineProps} // All THREE.Line2 props are valid
        // {...materialProps} // All THREE.LineMaterial props are valid
      /> */}
      {renderYears()}
    </group>
  );
});

export default RolledText;
