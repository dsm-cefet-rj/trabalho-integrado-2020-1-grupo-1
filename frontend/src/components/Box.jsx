import React from 'react';
import styled from 'styled-components';

export const AreaBox = styled.div`
  background: red;
  width: 80%;
  padding: 10px;
`

export const Title = styled.div`
  background: blue;
  width: 200px;
  height: 50px;
`

/**
 * @module components/Box 
 */

/**
 * Componente responsável por renderizar as box.
 * 
 */
function Box(){
  return (
    <section>
      <Title>

      </Title>
      <AreaBox>

      </AreaBox>
    </section>
  );
}

export default Box;
