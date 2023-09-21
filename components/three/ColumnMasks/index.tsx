import * as THREE from 'three';
import { Mask } from '@react-three/drei';
import _ from 'lodash';
import { useRef } from 'react';

const ColumnMasks = ({ startIndex = 0, columns = 10 }) => {
  const screenSizeRef = useRef({
    width: global?.window.innerWidth,
    height: global?.window.innerHeight,
  });
  const renderMasks = () => {
    const masks: JSX.Element[] = [];
    const { width, height } = screenSizeRef.current;
    const rowHeight = height / columns;

    _.times(10, index => {
      const y = -(height / 2) + index * rowHeight + rowHeight / 2;
      masks.push(
        <Mask
          key={`column-mask-${index}`}
          id={startIndex + index}
          position={[0, y, 0]}
        >
          <planeGeometry args={[rowHeight, height, 1, 1]} />
          <meshBasicMaterial color={0xff0000} />
        </Mask>,
      );
      // masks.push(
      //   <mesh position={[x, 0, 0]}>
      //     <planeGeometry args={[colWidth, height, 1, 1]} />
      //     <meshBasicMaterial color={0xff0000} />
      //   </mesh>,
      // );
    });
    return masks;
  };
  return <group>{renderMasks()}</group>;
};

export default ColumnMasks;
