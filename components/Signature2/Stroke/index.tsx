import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { createDerivedMaterial } from 'troika-three-utils';
import _ from 'lodash';
import * as THREE from 'three';
import vertexDefs from './shaders/vertexDefs.glsl';
import fragmentDefs from './shaders/fragmentDefs.glsl';
import vertexTransform from './shaders/vertexTransform.glsl';
import fragmentColorTransform from './shaders/fragmentColorTransform.glsl';

import SignatureCurve from './SignatureCurve';

// console.log('THREE.Curve:', THREE.Curve);

export type StrokePoint = {
  x: number;
  y: number;
  t: number;
};

export type StrokeProps = {
  points: StrokePoint[];
};

const Stroke = ({ points }: StrokeProps) => {
  const id = useId();
  const { size } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const meshMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const polyFunctionRef = useRef(null);
  const signatureCurveRef = useRef(new SignatureCurve(points));
  const [vertexIndex, setVertexIndex] = useState(
    new Float32Array(_.range(0, 99999999)),
  );

  const createMaterial = useCallback(() => {
    const position: any = meshRef.current?.geometry?.attributes?.position;
    let vertices = position?.array?.length
      ? position?.array?.length / 3
      : 9999999999999;

    const strokeMaterial = createDerivedMaterial(meshMaterialRef.current, {
      uniforms: {
        uScreenWidth: { value: size.width },
        uScreenHeight: { value: size.height },
        uMouseX: { value: 0 },
        uMouseY: { value: 0 },
        uScrollTop: { value: 0 },
        uIntroProgress: { value: 0 },
        uTotalVerts: { value: vertices },
      },
      vertexDefs,
      vertexTransform,
      fragmentDefs,
      fragmentColorTransform,
    });

    if (meshRef.current) {
      meshRef.current.material = strokeMaterial;
    }
  }, []);

  useEffect(() => {
    createMaterial();
  }, []);

  const p = signatureCurveRef?.current.getPoint(0.25);

  return (
    <group>
      <mesh ref={meshRef}>
        <tubeGeometry args={[signatureCurveRef.current, 200, 2, 20]}>
          <bufferAttribute
            attach={'attributes-aIndex'}
            array={new Float32Array(_.range(0, 9999))}
            count={vertexIndex.length}
            itemSize={1}
          />
        </tubeGeometry>
        <meshBasicMaterial ref={meshMaterialRef} color={0xff0000} transparent />
      </mesh>
    </group>
  );
};

export default Stroke;
