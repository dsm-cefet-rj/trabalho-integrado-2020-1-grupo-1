import styled from 'styled-components';

export const Screen = styled.div`
  background: #333;
  width: 60vw;
  height: 100vh;
  margin-left: 20vw;

  @media (max-width: 1000px) {
    width: 100vw;
    margin-left: 0vw;
  }
`
