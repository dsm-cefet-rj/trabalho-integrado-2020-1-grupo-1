import styled from 'styled-components';

export const TeamName = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  color: #FFF;
`

export const Since = styled.h6`
  font-size: 13px;
  font-weight: bold;
  margin-top: 5px;
  color: #E5E5E5;
  margin-bottom: 60px;
`

export const ModalScreen = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  background: rgba(0,0,0,.5);
  border: 1px solid red;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Modal = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 10px;
  background: red;

  h4 {
    text-align: center;
  }
`
