import React from 'react';

import Input from '../../components/Input';
import BTNSendData from '../../components/BTNSendData';
import BTNSelectImage from '../../components/BTNSelectImage';

import {
  Screen,
  SignupArea
} from './styles';

export default function Signup(){
  document.title = "Battleside - Signup";

  return (
    <Screen>
      <SignupArea>
        <h1>Cadastre-se</h1>
        <p>Campos com * são obrigatórios</p>
        <br /><br />

        <Input 
          type="text" 
          placeholder="Nome" 
          required={true} 
          id="signup_name"
        />

        <Input 
          type="text" 
          placeholder="Username" 
          required={true} 
          id="signup_username"
        />

        <BTNSelectImage content="Selecionar" />

        <Input 
          type="email" 
          placeholder="E-mail" 
          required={true} 
          id="signup_email"
        />

        <Input 
          type="password" 
          placeholder="Senha" 
          required={true} 
          id="signup_password"
        />

        <Input 
          type="password" 
          placeholder="Confirmar senha" 
          required={true} 
          id="signup_confirm_password"
        />

        <span>
          <Input 
            type="checkbox" 
            id="cb_policies"
          />
          Declaro que li e aceito os Termos de uso e as políticas de privacidade.
        </span>

        <BTNSendData type="button" disabled={false} content="Cadastrar" />
      </SignupArea>
    </Screen>
  )
}
