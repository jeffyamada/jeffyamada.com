import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';
import { Text as TroikaText, preloadFont } from 'troika-three-text';
import {
  Mask,
  Wireframe,
  useMask,
  // TransformControls,
  // Float,
  // Environment,
  // OrbitControls,
  // MeshDistortMaterial,
  // ContactShadows,
  // useGLTF,
} from '@react-three/drei';
// import * as THREE from 'three';

import { useAnimationFrame, useScroll, useVelocity } from 'framer-motion';

import { extend, useFrame, useThree } from '@react-three/fiber';
// import { useControls } from 'leva';
import _ from 'lodash';
// import gsap, { Expo } from 'gsap';
// import { ScrollPageContext } from '@/components/ScrollingPage';
import useScreenSize from '@/hooks/useScreenSize';
import { createDerivedMaterial } from 'troika-three-utils';
import vertexTransform from './shaders/vertexTransform.glsl';
import fragmentColorTransform from './shaders/fragmentColorTransform.glsl';
import defs from './shaders/defs.glsl';

extend({ TroikaText });

export type YearProps = {
  text: string;
  start: number;
  end: number;
  velocity: {
    current: number;
  };
};

type Ref = THREE.Group;

const Year = React.forwardRef<Ref, YearProps>(
  ({ text = '', start = 0, end = 400, velocity = { current: 0 } }, ref) => {
    const textRef = useRef<typeof TroikaText>();
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);
    const { screenWidth, screenHeight } = useScreenSize();
    const { size } = useThree();

    const [fontSize, setFontSize] = useState(100);

    const font = '/files/fonts/sohne-halbfett.ttf';

    const scrollTargetRef = useRef<HTMLElement>(
      document.getElementById('page-container'),
    );

    const { scrollYProgress } = useScroll({
      target: scrollTargetRef,
      offset: [`${start}px`, `${end}px`],
    });

    const [isReady, setIsReady] = useState(false);

    const createTextMaterial = useCallback(() => {
      const textBaseMaterial = new THREE.MeshBasicMaterial({});
      const textMaterial = createDerivedMaterial(textBaseMaterial, {
        uniforms: {
          uTime: { value: 0 },
          uTextHeight: { value: fontSize * 0.72 },
          uAnimationProgress: { value: 1 },
          uVelocity: { value: 0 },
        },
        vertexDefs: defs,
        vertexTransform,
        fragmentDefs: defs,
        fragmentColorTransform,
        side: THREE.DoubleSide,
      });

      return textMaterial;
    }, [size.width, size.height]);

    useEffect(() => {
      const minScreen = Math.min(screenWidth, screenHeight);
      setFontSize(minScreen / 2.5);
    }, [screenWidth, screenHeight, setFontSize]);

    useFrame((state, delta) => {
      // return;
      const textMaterial = textRef.current?.material as THREE.ShaderMaterial;
      if (textMaterial?.uniforms) {
        textMaterial.uniforms.uTime.value += delta;
        textMaterial.uniforms.uTextHeight.value = fontSize * 0.72;
        textMaterial.uniforms.uAnimationProgress.value = scrollYProgress.get();
        textMaterial.uniforms.uVelocity.value = velocity?.current || 0;
      }
    });

    useEffect(() => {
      if (!textRef.current) return;

      textRef.current.material = createTextMaterial();
      const options = { font, sdfGlyphSize: 120 };
      preloadFont(options, () => {
        setIsReady(true);
      });
    }, [createTextMaterial, textRef.current]);

    return (
      <group ref={ref}>
        <troikaText
          ref={textRef}
          text={text}
          font={font}
          fontSize={fontSize}
          anchorX="center"
          anchorY="middle"
          glyphGeometryDetail={20}
          // curveRadius={-120}
          // lineHeight={60}
          // strokeColor={0xffffff}
          // strokeWidth={4}
        >
          <meshBasicMaterial
            color={0xffffff}
            opacity={1}
            // {...stencil}
            ref={materialRef}
            // wireframe
            side={THREE.DoubleSide}
          />
        </troikaText>
      </group>
    );
  },
);

export default Year;
