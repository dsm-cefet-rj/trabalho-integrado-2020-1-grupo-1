import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  padding: 15px;
  width: 150px;
  
  border-radius: 5px;
  background: white;
  font-size: 10pt;
  color: #000;

  margin-bottom: 10px;

  :hover {
    background: gray;
    transition: .4s;
  }
`

export default function BTNSendData(props) {
  return (
    <Button 
      type={props.type} 
      disabled={props.disabled}
    >
      {props.content}
    </Button>
  );
}
