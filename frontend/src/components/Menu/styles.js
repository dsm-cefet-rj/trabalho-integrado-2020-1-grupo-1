import styled from 'styled-components';

export const Menu = styled.div`
  #check {
    display: none;
  }

  #icon {
    cursor: pointer;
    padding: 10px;
    position: fixed;
    z-index: 2;
    border-radius: 30px;
    background-color: #333;
    box-shadow: 0 1px 5px rgba(0,0,0,.4);
    top: 10px;
    left: 10px;
    display: flex;
  }

  .sidebar {
    background: #222;
    height: 100vh;
    width: 260px;
    position: fixed;
    transition: all .2s linear;
    left: -261px;
    z-index: 1;

    #btn_exit {
      width: 25px;
      margin-left: 30px;
      cursor: pointer;
    }
  }

  nav {
    width: 260px;
    position: absolute;
    top: 60px;
  }

  #check:checked ~ .sidebar{
    transform: translateX(260px);
  }

  ul {
    margin-top: -20px;
    margin-bottom: 110px;
    list-style: none;
    text-align: center;
    width: 260px;
    margin-top: 40px;
  }

  .menu-option {
    color: #E5E5E5;
    background-color: rgba(0,0,0,0.2);
    border-radius: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 11pt;
    margin-bottom: 8px;
    width: 200px;    

    a:hover {
      background: rgba(0,0,0,0.2);
      transition: 0.8s;
    }
  }

  .dropdown-menu {
    background: #444;
    margin-left: 10px;
    padding: 7px;
    border: 1px solid #222;
    border-radius: 5px;
    outline: none;

    a {
      text-decoration: none;
    }
  }

  .menu-dropdown-option {
    margin-left: 7px;
    width: 100%;
    border: none;
    padding: 7px;
    color: #FFF;
    margin-bottom: 4px;
    margin-left: 0px;
    font-size: 11pt;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .menu-dropdown-option:hover {
    background: rgba(0,0,0,0.1);
    transition: .5s;
  }  
`
