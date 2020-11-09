import React from 'react';

import { 
  Banner, 
  ProfilePicture 
} from './styles';

import foto from '../../foto.png';

export default function Header(props) {
  return (
    <Banner>
      <ProfilePicture src={foto} alt="Foto perfil" />
    </Banner>
  );
}
