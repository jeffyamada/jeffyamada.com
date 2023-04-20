import { useEffect, useId, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import signatureStrokes from "./jeff-signature.json";
import _ from "lodash";
import * as THREE from "three";
// import { gsap, Linear } from "gsap";

const Signature = () => {
  const id = useId();

  const renderStrokes = () => {
    return _.map(signatureStrokes.strokes, (stroke, i) => {
      console.log("stroke:", stroke);
      const key = `stroke-${i}-${id}`;
      return <group key={key}></group>;
    });
  };

  return <group>{renderStrokes()}</group>;
};

export default Signature;
