import Head from 'next/head';
import styled from 'styled-components';
import ThreeCanvas from 'components/ThreeCanvas';
import LinkedinIcon from '@/components/atoms/LinkedinIcon';
import EmailIcon from '@/components/atoms/EmailIcon';
import DribbbleIcon from '@/components/atoms/DribbbleIcon';
import { useContext, useEffect, useRef } from 'react';
import { AppContext } from 'pages/_app';
import { gsap, Expo } from 'gsap';
import { createClient } from 'next-sanity';
import ScrollingPage from '@/components/ScrollingPage';
import Project from '@/types/schemas/project';
import ScrollIcon from '@/components/ScrollIcon';
import RolledText from '@/components/three/RolledText';

export const Container = styled.div`
  height: 2000vh;
  overflow: hidden;
  /* cursor: none; */
  /* transition: height 1s ease-in-out; */

  &.intro-complete {
    height: 2000vh;
  }
`;

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

export type HomeProps = {
  projects: Project[];
};

const Home = ({ projects }: HomeProps) => {
  const { fontsLoaded } = useContext(AppContext);
  const textBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textBoxRef?.current) return;
    gsap.to(textBoxRef?.current, {
      x: 0,
      duration: 1,
      delay: 1,
      ease: Expo.easeInOut,
    });
    gsap.to(textBoxRef?.current, {
      height: 'auto',
      duration: 1.2,
      delay: 1.6,
      ease: Expo.easeInOut,
    });
  }, [fontsLoaded]);

  return (
    <>
      <Head>
        <title>Jeff Yamada</title>
        <meta
          name="description"
          content="Portfolio and playground of Jeff Yamada"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container id="page-container">
        <ThreeCanvas>
          <RolledText />
        </ThreeCanvas>
        <ScrollIcon />
      </Container>
    </>
  );
};

const client = createClient({
  projectId: '9i6kbmf2',
  dataset: 'production',
  apiVersion: '2023-09-08',
  useCdn: false,
});

export async function getStaticProps() {
  const projects = await client.fetch(`*[_type == "project"]`);

  return {
    props: {
      projects,
    },
  };
}

export default Home;
