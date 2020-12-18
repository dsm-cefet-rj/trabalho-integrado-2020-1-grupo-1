import React from 'react';
import styled from 'styled-components';

export const Inputs = styled.input`
  padding: 12px;
  width: 80%;
  border-radius: 5px;

  margin: 8px 0;

  ::placeholder {
    font-size: 13px;
  }
`

export default function Input(props) {
  return (
    <Inputs type={props.type} placeholder={props.placeholder} required={props.required} />
  )
}
