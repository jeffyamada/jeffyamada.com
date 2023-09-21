import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  /* opacity: 0; */

  .scrolling-active & {
    transition: opacity 0.5s;
    opacity: 1;
  }
`;

export const Paragraph = styled.div`
  width: 80vw;
  max-width: 800px;
  font-size: 22px;
  line-height: 28px;
  font-family: 'Soehne Buch', 'Helvetica Neue', sans-serif, Arial;
  color: white;
`;

export const Word = styled.div`
  display: inline-block;
  overflow: hidden;
`;

export const Span = styled.span`
  display: inline-block;
  opacity: 0;
`;

export const ScrollText = styled.span`
  position: fixed;
  bottom: 10vh;
  font-size: 16px;
  font-family: 'Soehne Buch', 'Helvetica Neue', sans-serif, Arial;
  color: white;
`;
