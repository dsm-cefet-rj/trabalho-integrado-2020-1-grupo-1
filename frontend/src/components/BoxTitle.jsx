import React from 'react';
import styled from 'styled-components';

export const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  padding: 15px;
`

export default function BoxTitle(props) {
  return (
    <Title>{props.content}</Title>
  );
}
