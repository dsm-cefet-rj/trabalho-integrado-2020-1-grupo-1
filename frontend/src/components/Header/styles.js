import styled from 'styled-components';

export const Banner = styled.div`
  height: 150px;
  width: 60vw;
  background: #222;

  display: flex;
  justify-content: center;  

  margin-left: 20vw;

  @media (max-width: 1000px) {
    width: 100vw;
    margin-left: 0vw;
  }
`

export const ProfilePicture = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px;
  border: 5px solid #E5E5E5;
  margin-top: 50px;
`
