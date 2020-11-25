import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Menu } from './styles';

import Dropdown from 'react-bootstrap/Dropdown';

import * as UserActions from '../../store/actions/user';
import * as TeamActions from '../../store/actions/team';

import icon from './icon.png';
import logout from './logout.png';

const Top_Left_Side_Menu = ({ user, logoutUser, logoutTeam }) => {
  const [width, setWidth] = useState(window.innerWidth);

  window.addEventListener('resize', function(){
    setWidth(window.innerWidth)
  });

  function handleLogout() {
    logoutUser()
    logoutTeam()
    window.location.href='/'
  }

  return (
    <Menu>
      <input type="checkbox" id="check" />
        <label id="icon" htmlFor="check"><img src={ icon } alt="menu" /></label>
        <div className="sidebar">
          <nav>            
            <ul>
              <Dropdown drop={(width < 767.98) ? 'down' : 'right'}>
                <Dropdown.Toggle variant="menu-option" id="menu-option" className="menu-option">
                  {(user.name).split(' ')[0]}
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dropdown-menu" className="dropdown-menu" id="dropdown-menu" >
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/edit" id="">Editar perfil</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown drop={(width < 767.98) ? 'down' : 'right'}>
                <Dropdown.Toggle variant="menu-option" id="menu-option" className="menu-option">
                  Equipes
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dropdown-menu" className="dropdown-menu" id="dropdown-menu">
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/team" id="">Minha equipe</Dropdown.Item>
                </Dropdown.Menu>        
              </Dropdown>

              <Dropdown drop={(width < 767.98) ? 'down' : 'right'}>
                <Dropdown.Toggle variant="menu-option" id="menu-option" className="menu-option">
                  Competições
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dropdown-menu" className="dropdown-menu" id="dropdown-menu">
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/competition" id="">Ver competições</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/newcompetition" id="">Criar competição</Dropdown.Item>
                  <Dropdown.Item variant="menu-dropdown-option" className="menu-dropdown-option" href="/mycompetition" id="">Minha competição</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>              
            </ul>
            <div>
              <img src={logout} alt="Sair" id="btn_exit" title="Sair" onClick={handleLogout}/>
            </div>
          </nav>
        </div>
    </Menu>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(UserActions.logoutUser()),
  logoutTeam: () => dispatch(TeamActions.logoutTeam())
})  

export default connect(mapStateToProps, mapDispatchToProps)(Top_Left_Side_Menu);
