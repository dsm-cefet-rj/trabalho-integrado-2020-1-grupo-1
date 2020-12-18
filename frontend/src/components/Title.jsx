import React from 'react';
import styled from 'styled-components';

export const Text = styled.h1`
  color: #FFF;
  font-size: 25pt;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-bottom: 50px;
`

export default function Title(props) {
  return (
    <Text>{props.content}</Text>
  );
}
