import { useCallback, useContext, useEffect, useRef } from 'react';
import _ from 'lodash';
import * as THREE from 'three';
import { BufferGeometry, Group, Points, PointsMaterial } from 'three';
import { createDerivedMaterial } from 'troika-three-utils';
import vertexDefs from './shaders/vertexDefs.glsl';
import vertexTransform from './shaders/vertexTransform.glsl';
import vertexMainOutro from './shaders/vertexMainOutro.glsl';
import fragmentDefs from './shaders/fragmentDefs.glsl';
import fragmentColorTransform from './shaders/fragmentColorTransform.glsl';
// import fragmentShader from './shaders/fragmentShader.glsl';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { gsap } from 'gsap';
import { AppContext } from 'pages/_app';

const TOTAL_DOTS = 60000;
const positions = new Float32Array(_.map(_.range(0, TOTAL_DOTS * 3), () => 0));
const randoms = new Float32Array(
  _.map(_.range(0, TOTAL_DOTS * 3), () => Math.round(Math.random() * 1000)),
);
const indexes = new Float32Array(_.range(0, TOTAL_DOTS));

export type ThreeGridProps = {
  dotColor?: number;
  show?: boolean;
};

const COL_WIDTH = 4;
const ROW_HEIGHT = 4;
const STROKE_LENGTH = 60;

const ThreeGrid = ({}: ThreeGridProps) => {
  const { fontsLoaded } = useContext(AppContext);
  const { size } = useThree();
  const groupRef = useRef<Group>(null);
  const pointsRef = useRef<Points>(null);
  const geometryRef = useRef<BufferGeometry>(null);
  const materialRef = useRef<PointsMaterial>(null);
  const shaderRef = useRef<THREE.Shader>(null);
  const mouseRef = useRef({ x: 0, y: 0, v: 0 });
  const pointTexture = useTexture('/files/textures/circle.png');
  const strokesUniformRef = useRef<THREE.Vector3[]>(
    _.map(_.range(0, STROKE_LENGTH), () => new THREE.Vector3(200, 200, 0)),
  );

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      const x = event.clientX - size.width / 2;
      const y = event.clientY - size.height / 2;
      gsap.to(mouseRef.current, {
        x,
        y,
        duration: 0.2,
        onUpdate: updateStroke,
      });
    },
    [size.width, size.height],
  );

  const onTouchMove = useCallback(
    (event: TouchEvent) => {
      if (event.touches.length) {
        const x = event.touches[0].clientX - size.width / 2;
        const y = event.touches[0].clientY - size.height / 2;
        gsap.to(mouseRef.current, {
          x,
          y,
          duration: 0.5,
          onUpdate: updateStroke,
        });
      }
    },
    [size.width, size.height],
  );

  const updateStroke = () => {
    addStroke(mouseRef.current.x, -mouseRef.current.y);
  };

  const addStroke = (x: number, y: number) => {
    mouseRef.current.v += 0.005;
    mouseRef.current.v = Math.min(mouseRef.current.v, 1);
    strokesUniformRef.current.unshift(new THREE.Vector3(x, y, 1));
    strokesUniformRef.current.splice(STROKE_LENGTH);
  };

  const createMaterial = useCallback(() => {
    const pointMaterial = createDerivedMaterial(materialRef.current, {
      uniforms: {
        uScreenWidth: { value: size.width },
        uScreenHeight: { value: size.height },
        uMouseX: { value: 0 },
        uMouseY: { value: 0 },
        uMouseV: { value: 0 },
        uScrollTop: { value: 0 },
        uTime: { value: 0 },
        uIntroProgress: { value: 0 },
        uStrokes: { value: strokesUniformRef.current },
      },
      vertexDefs,
      vertexTransform,
      vertexMainOutro,
      fragmentDefs,
      fragmentColorTransform,
    });

    if (pointsRef.current) {
      console.log('applying material');
      pointsRef.current.material = pointMaterial;
      // pointsRef.current.material = null;
    }
  }, []);

  useEffect(() => {
    createMaterial();
  }, []);

  useEffect(() => {
    const pointMaterial = pointsRef.current?.material as THREE.ShaderMaterial;
    if (!pointMaterial?.uniforms) return;
    gsap.to(pointMaterial.uniforms.uIntroProgress, {
      value: 1,
      duration: 4,
      delay: 1,
    });
  }, [fontsLoaded]);

  useEffect(() => {
    global?.window.addEventListener('mousemove', onMouseMove);
    global?.window.addEventListener('touchmove', onTouchMove);
    return () => {
      global?.window.removeEventListener('mousemove', onMouseMove);
      global?.window.removeEventListener('touchmove', onTouchMove);
    };
  }, [size.width, size.height]);

  useEffect(() => {
    const pointMaterial = pointsRef.current?.material as THREE.ShaderMaterial;
    if (pointMaterial?.uniforms) {
      pointMaterial.uniforms.uScreenWidth.value = size.width;
      pointMaterial.uniforms.uScreenHeight.value = size.height;
    }
  }, [size.width, size.height]);

  useFrame((state, delta) => {
    const pointMaterial = pointsRef.current?.material as THREE.ShaderMaterial;
    if (pointMaterial?.uniforms) {
      pointMaterial.uniforms.uTime.value += delta;
      pointMaterial.uniforms.uMouseX.value = mouseRef.current.x;
      pointMaterial.uniforms.uMouseY.value = mouseRef.current.y;
      pointMaterial.uniforms.uMouseV.value = mouseRef.current.v;
      pointMaterial.uniforms.uStrokes.value = strokesUniformRef.current;
    }

    _.each(strokesUniformRef.current, stroke => {
      stroke.z *= 0.99;
    });

    mouseRef.current.v *= 0.999;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} renderOrder={0}>
      <points ref={pointsRef}>
        <bufferGeometry ref={geometryRef} attach="geometry">
          <bufferAttribute
            attach={'attributes-position'}
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach={'attributes-aIndex'}
            array={indexes}
            count={indexes.length}
            itemSize={1}
          />
          <bufferAttribute
            attach={'attributes-aRandom'}
            array={randoms}
            count={randoms.length}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          attach="material"
          map={pointTexture}
          color={0x000000}
          size={size.width > 600 ? 8 : 4}
          sizeAttenuation={false}
          transparent={true}
          // alphaTest={0.15}
          // opacity={0.5}
        />
      </points>
    </group>
  );
};

export default ThreeGrid;
