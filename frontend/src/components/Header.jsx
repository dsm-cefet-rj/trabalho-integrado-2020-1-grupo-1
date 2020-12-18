import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

export const Banner = styled.div`
  height: 150px;
  width: 100%;
  background: #222;

  display: flex;
  justify-content: center;  

  margin-bottom: 50px;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`

export const ProfilePicture = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px;
  border: 5px solid #E5E5E5;
  margin-top: 30px;
`

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
