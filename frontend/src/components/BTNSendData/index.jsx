import React from 'react';

import { Button } from './styles';

export default function Btn_sendData(props) {
  return (
    <Button 
      type={props.type} 
      disabled={props.disabled}
    >
      {props.content}
    </Button>
  );
}
