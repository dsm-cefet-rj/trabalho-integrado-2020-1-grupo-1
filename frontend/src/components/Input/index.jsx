import React from 'react';

import { Inputs } from './styles';

export default function Input(props) {
  return (
    <Inputs type={props.type} placeholder={props.placeholder} required={props.required} />
  )
}
