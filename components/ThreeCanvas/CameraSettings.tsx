import React, { useRef, useLayoutEffect } from "react";
import { /* Canvas, */ useThree } from "@react-three/fiber";

const perspective = 2000;

export const threeSettings = {
  camera: {
    perspective,
    near: 1,
    far: perspective * 10,
  },
};

const CameraSettings = (props: any) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const { size, set } = useThree();

  useLayoutEffect(() => {
    if (cameraRef.current && !!global?.window) {
      const { innerWidth: ww, innerHeight: wh } = window;
      const { perspective, near } = threeSettings.camera;

      const fov = (180 * (2 * Math.atan(wh / 2 / perspective))) / Math.PI;

      cameraRef.current.fov = fov;
      cameraRef.current.aspect = ww / wh;
      cameraRef.current.near = near;
      cameraRef.current.far = perspective * 10;
      cameraRef.current.position.set(0, 0, perspective);

      cameraRef.current.updateProjectionMatrix();
    }
  }, [size.height, size.width]);

  useLayoutEffect(() => {
    set({ camera: cameraRef.current });
  }, []);

  return <perspectiveCamera ref={cameraRef} {...props} />;
  // return <orthographicCamera ref={cameraRef} {...props} />;
};

export default CameraSettings;
