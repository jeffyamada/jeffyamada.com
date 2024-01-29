import Head from 'next/head';
import styled, { withTheme } from 'styled-components';
// import ThreeCanvas from 'components/ThreeCanvas';
// import LinkedinIcon from '@/components/atoms/LinkedinIcon';
// import EmailIcon from '@/components/atoms/EmailIcon';
// import DribbbleIcon from '@/components/atoms/DribbbleIcon';
import { Suspense, useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from 'pages/_app';
import { gsap, Expo } from 'gsap';
import { createClient } from 'next-sanity';
// import ScrollingPage from '@/components/ScrollingPage';
import Project from '@/types/schemas/project';
import { Canvas } from '@react-three/fiber';
import Halftone from '@/components/three/Halftone';

const TextBox = styled.div`
  position: fixed;
  bottom: 20vh;
  left: calc(50vw - 40px);
  display: inline-block;
  background: black;
  margin-top: 20vh;
  transform: translateX(-100%);

  overflow: hidden;
  height: 2px;
  opacity: 0;

  .fonts-loaded & {
    opacity: 1;
  }
`;

const TextContent = styled.div`
  padding: 20px 28px 20px 12px;
`;

const Icons = styled.div`
  padding-left: 8px;
`;

export type HalftonePageProps = {
  projects: Project[];
};

import useScreenSize from '@/hooks/useScreenSize';
import ThreeCanvas from '@/components/ThreeCanvas';

const HalftonePage = ({ projects }: HalftonePageProps) => {
  // const { fontsLoaded } = useContext(AppContext);
  const { screenWidth: ww, screenHeight: wh } = useScreenSize();
  const [doRender, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  const perspective = 2000;
  const fov = (180 * (2 * Math.atan(wh / 2 / perspective))) / Math.PI;

  if (!doRender) return null;

  return (
    <ThreeCanvas>
      {/* <color attach="background" args={[0xffffff]} /> */}
      <Halftone />
    </ThreeCanvas>
    // <Canvas
    //   camera={{
    //     fov,
    //     aspect: ww / wh,
    //     near: 1,
    //     far: perspective * 10,
    //     position: [0, 0, perspective],
    //   }}
    //   style={{ width: ww, height: wh, background: 'white' }}
    // >
    //   <Suspense fallback={null}>
    //     <Halftone />
    //   </Suspense>
    // </Canvas>
  );
};

const client = createClient({
  projectId: '9i6kbmf2',
  dataset: 'production',
  apiVersion: '2023-09-08',
  useCdn: false,
});

export async function getStaticProps() {
  // const projects = await client.fetch(`*[_type == "project"]`);

  return {
    props: {
      projects: [],
    },
  };
}

export default HalftonePage;
