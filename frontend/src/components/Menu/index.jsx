import React, { useState } from 'react';

import { Menu } from './styles';

import Dropdown from 'react-bootstrap/Dropdown';

import icon from './icon.png';
import logout from './logout.png';

export default function Top_Left_Side_Menu() {
  const [width, setWidth] = useState(window.innerWidth);

  window.addEventListener('resize', function(){
    setWidth(window.innerWidth)
  });

  return (
    <Menu>
      <input type="checkbox" id="check" />
        <label id="icon" htmlFor="check"><img src={ icon } alt="menu" /></label>
        <div className="sidebar">
          <nav>            
            <ul>
              <Dropdown drop={(width < 767.98) ? 'down' : 'right'}>
                <Dropdown.Toggle variant="menu-option" id="menu-option" className="menu-option">
                  Nome_usuario
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
              <img src={logout} alt="Sair" id="btn_exit" title="Sair" />
            </div>
          </nav>
        </div>
    </Menu>
  )
}
