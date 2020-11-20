import styled from 'styled-components';

export const Screen = styled.div`
  width: 100%;
  height: 100vh;
  background: #393939;

  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: #FFF;
    text-decoration: none;
    text-align: center;
  }

  #logo {
    margin-bottom: 50px;
  }

  #area-link-btn {
    margin-top: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    a {
      padding-bottom: 15px;
    }
  }

  #signup {
    margin-top: 70px;
  }
`

export const LoginArea = styled.section`
  height: 500px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  padding: 50px;
`
