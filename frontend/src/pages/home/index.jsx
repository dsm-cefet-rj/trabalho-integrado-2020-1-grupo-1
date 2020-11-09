import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import BTNSendData from '../../components/BTNSendData';

import { 
  Screen,
  LoginArea 
} from './styles';

export default function Home() {
  document.title = "Battleside";

  const [email, setEmail] = useState('');

  function isEmail(){
    if(email.length() === 0) {
      console.log('inválido')
      return
    } else if(email.indexOf('@') === -1) {
      console.log('inválido2')
      return
    } 
  }
  
  return (
    <Screen>
      <LoginArea>
        <h1 id="logo">LOGO</h1>

        <Input 
          type="text" 
          placeholder="E-mail" 
          required={true} 
          id="lgn_email"
          onChange={ e => setEmail(e.target.value) }
          onBlur={ isEmail }
        />

        <Input 
          type="password" 
          placeholder="Senha" 
          required={true} 
          id="lgn_password"
        />

        <div id="area-link-btn">
          <Link to="/forget">Esqueci minha senha</Link>
          <BTNSendData type="button" disabled={false} content="Entrar" />
        </div>        

        <Link to="/signup" id="signup">Novo por aqui? Clique aqui e realize seu cadastro agora mesmo!</Link>
      </LoginArea>
      
      {/* <Link to="/policies">Políticas de privacidade</Link>
      |
      <Link to="/terms">Termos de uso</Link> */}
    </Screen>
  )
}
