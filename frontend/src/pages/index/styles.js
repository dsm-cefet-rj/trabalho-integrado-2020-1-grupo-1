import styled from 'styled-components';

export const Screen = styled.div`
  width: 60%;
  height: 100vh;
  background: red;
  margin-left: 20%;

  @media (max-width: 1000px) {
    width: 90%;
    margin-left: 5%;
  }
`

export const Roles = styled.div`
  width: 100%;
  height: 200px;
  background: green;
  
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const RoleImage = styled.div`
  width: 100px;
  height: 100px;
  background: blue;
`

export const ChampionsList = styled.div`
  width: 100%;
  height: 120px;
  background: red;
`

export const Champion = styled.div`
  width: 100%;
  height: 120px;
  background: yellow;
  border: 1px solid pink;
`

export const BoxTeamName = styled.h3`
  font-size: 17px;
  font-weight: bold;
  margin-top: 20px;
`

export const BoxContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`

export const BoxSince = styled.h6`
  font-size: 13px;
  font-weight: bold;
  margin-top: 5px;
`
