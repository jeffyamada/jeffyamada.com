import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styled from 'styled-components';
import ThreeCanvas from 'components/ThreeCanvas';
import fonts from 'styles/fonts';
import LinkedinIcon from '@/components/atoms/LinkedinIcon';
import EmailIcon from '@/components/atoms/EmailIcon';
import DribbbleIcon from '@/components/atoms/DribbbleIcon';
import { useContext, useEffect, useRef } from 'react';
import { AppContext } from 'pages/_app';
import { gsap, Expo } from 'gsap';

const inter = Inter({ subsets: ['latin'] });

const Foreground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const TextBox = styled.div`
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
  padding: 20px 48px 22px 32px;
`;

const Icons = styled.div`
  padding-left: 8px;
`;

const H1 = styled.h1`
  font-family: ${fonts.light};
  font-size: 50px;
  color: white;
  padding-left: 14px;
  padding-bottom: 12px;
`;

export default function Home() {
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
      <ThreeCanvas />
      <Foreground>
        <TextBox ref={textBoxRef}>
          <TextContent>
            <H1>jeffyamada™</H1>
            <Icons>
              <a href="https://www.linkedin.com/in/jeffyamada/" target="_blank">
                <LinkedinIcon />
              </a>
              <a href="mailto:jeff@jeffyamada.com" target="_blank">
                <EmailIcon />
              </a>
              <a href="https://dribbble.com/impossible-bureau" target="_blank">
                <DribbbleIcon />
              </a>
            </Icons>
          </TextContent>
        </TextBox>
      </Foreground>
    </>
  );
}
