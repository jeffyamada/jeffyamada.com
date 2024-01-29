import * as THREE from 'three';
import { Plane, Points, Text, useFBO, useTexture } from '@react-three/drei';
import { createDerivedMaterial } from 'troika-three-utils';
import _ from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import vertexDefs from './shaders/vertexDefs.glsl';
import vertexTransform from './shaders/vertexTransform.glsl';
import vertexMainOutro from './shaders/vertexMainOutro.glsl';
import fragmentDefs from './shaders/fragmentDefs.glsl';
import fragmentColorTransform from './shaders/fragmentColorTransform.glsl';
import { useFrame, useThree } from '@react-three/fiber';
import {
  BufferAttribute,
  LinearSRGBColorSpace,
  NearestFilter,
  RGBAFormat,
} from 'three';
import { useControls } from 'leva';

// const font = '/files/fonts/soehne-extrafett.ttf';
const font = '/files/fonts/DMSans-Bold.woff';

export default function Halftone() {
  const { camera, gl, scene, size } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const tonesRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Mesh>(null);
  // const renderTarget = useFBO();

  const renderTarget = useFBO({});

  const TOTAL_DOTS = Math.round((size.width * size.height) / 2);

  const { uSizeMax, uSizeMin, uSinX, uSinY, uSinXAmount, uSinYAmount } =
    useControls({
      uSizeMax: { value: 10, min: 4, max: 32 },
      uSizeMin: { value: 1.05, min: 1, max: 32, step: 0.01 },
      uSinX: { value: 150, min: -600, max: 600 },
      uSinY: { value: 470, min: -600, max: 600 },
      uSinXAmount: { value: 200, min: -400, max: 400 },
      uSinYAmount: { value: -200, min: -400, max: 400 },
    });

  const positionsRef = useRef(new Float32Array(_.range(0, TOTAL_DOTS * 3, 0)));
  const indexesRef = useRef(new Float32Array(_.range(TOTAL_DOTS)));

  const pointTexture = useTexture('/files/textures/circle.png');

  const createMaterial = useCallback(() => {
    const pointMaterial = createDerivedMaterial(materialRef.current, {
      uniforms: {
        uTime: { value: 0 },
        uScreenWidth: { value: size.width },
        uScreenHeight: { value: size.height },
        uSizeMax: { value: uSizeMax },
        uSizeMin: { value: uSizeMin },
        uSinX: { value: uSinX },
        uSinY: { value: uSinY },
        uSinXAmount: { value: uSinXAmount },
        uSinYAmount: { value: uSinYAmount },
        uTexture: { value: renderTarget.texture },
      },
      vertexDefs,
      vertexTransform,
      vertexMainOutro,
      fragmentDefs,
      fragmentColorTransform,
    });

    if (pointsRef.current) {
      pointsRef.current.material = pointMaterial;
      // pointsRef.current.material = null;
    }
  }, []);

  useEffect(() => {
    if (!geometryRef?.current) return;

    positionsRef.current = new Float32Array(_.range(0, TOTAL_DOTS * 3, 0));
    const { attributes } = geometryRef.current;
    attributes.position = new BufferAttribute(positionsRef.current, 3);
    attributes.position.needsUpdate = true;

    indexesRef.current = new Float32Array(_.range(TOTAL_DOTS));
    attributes.aIndex = new BufferAttribute(indexesRef.current, 1);
    attributes.aIndex.needsUpdate = true;

    const pointMaterial = pointsRef.current?.material as THREE.ShaderMaterial;
    if (!pointMaterial?.uniforms) return;
    pointMaterial.uniforms.uScreenWidth.value = size.width;
    pointMaterial.uniforms.uScreenHeight.value = size.height;
  }, [size.width, size.height]);

  useFrame((state, delta) => {
    if (!pointsRef?.current) return;
    if (!textRef?.current) return;
    if (!tonesRef?.current) return;

    // textRef.current.position.y = (state.clock.elapsedTime % 500) - 250;
    textRef.current.position.y = -100;
    tonesRef.current.position.y += delta.valueOf() * 100;
    tonesRef.current.position.y = tonesRef.current.position.y % 200;
    // tonesRef.current.rotation.z += delta.valueOf();
    // tonesRef.current.position.y += delta.valueOf();
    // tonesRef.current.position.y = tonesRef.current.position.y % 500;

    textRef.current.visible = true;
    pointsRef.current.visible = false;
    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    pointsRef.current.visible = true;
    textRef.current.visible = false;
    gl.setRenderTarget(null);

    const pointMaterial = pointsRef.current?.material as THREE.ShaderMaterial;

    if (pointMaterial?.uniforms) {
      // pointMaterial.uniforms.uTime.value += delta;
      pointMaterial.uniforms.uTime.value = state.clock.elapsedTime;
      pointMaterial.uniforms.uScreenWidth.value = size.width;
      pointMaterial.uniforms.uScreenHeight.value = size.height;

      pointMaterial.uniforms.uSizeMax.value = uSizeMax;
      pointMaterial.uniforms.uSizeMin.value = uSizeMin;
      pointMaterial.uniforms.uSinX.value = uSinX;
      pointMaterial.uniforms.uSinY.value = uSinY;
      pointMaterial.uniforms.uSinXAmount.value = uSinXAmount;
      pointMaterial.uniforms.uSinYAmount.value = uSinYAmount;

      pointMaterial.uniforms.uTexture.value = renderTarget.texture;
    }
  });

  useEffect(() => {
    createMaterial();
  }, []);

  return (
    <group>
      <points ref={pointsRef}>
        {/* <color attach="background" args={[0xffffff]} /> */}
        <bufferGeometry ref={geometryRef} attach="geometry">
          <bufferAttribute
            attach={'attributes-aIndex'}
            array={indexesRef.current}
            count={indexesRef.current.length}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          attach="material"
          color={0x000000}
          size={16}
          map={pointTexture}
          sizeAttenuation={false}
          transparent={true}
          // map={renderTarget.texture}
        />
      </points>
      <group ref={tonesRef}>
        <Text
          ref={textRef}
          font={font}
          fontSize={160}
          color={0xffffff}
          anchorX="center"
          anchorY="middle"
          // transparent
          // opacity={0.5}
          position={[0, 200, 0]}
          outlineBlur={40}
          outlineColor={0xffffff}
        >
          COTANGENT
        </Text>
      </group>

      {/* <Plane args={[800, 800, 1, 1]} position={[0, 0, 100]}>
        <meshBasicMaterial map={renderTarget.texture} />
      </Plane> */}
    </group>
  );
}