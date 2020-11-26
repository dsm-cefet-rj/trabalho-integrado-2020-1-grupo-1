import React from 'react';
import { connect } from 'react-redux';

import { 
  Banner, 
  ProfilePicture 
} from './styles';

function Header({ user }) {
  return (
    <Banner>
      <ProfilePicture src={user.profile_picture} alt="Foto perfil" />
    </Banner>
  );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Header);
