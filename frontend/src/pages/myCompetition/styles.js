import styled from 'styled-components';

export const CardMatch = styled.div`
  background: #CECECE;
  border-radius: 10px;
  height: 190px;
  margin-bottom: 10px;

  .img-right {
    float: right;
  }

  .img-team {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .name-team {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 17px;
    font-weight: bold;
  }

  .versus {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 40px;
    font-weight: bold;
  }

  .buttons-winner {
    margin-top: 10px;
    .col-md-6 {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    button {
      width: 150px;
      padding: 7px;
      border-radius: 3px;
    }
  }

  .btn-print {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;

    button {
      width: 150px;
      padding: 7px;
      border-radius: 3px;
    }
  }
`

export const AdminArea = styled.div`
  background: #CECECE;
  border-radius: 10px;
  height: 110px;
  margin-top: 30px;
  padding: 10px;

  h4 {
    font-weight: bold;
  }

  button {
    padding: 7px 30px;
    margin-right: 10px;
    border-radius: 3px;
    margin-top: 15px;
  }
`
