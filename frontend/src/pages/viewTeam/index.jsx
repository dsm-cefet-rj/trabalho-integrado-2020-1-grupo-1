import React from 'react';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

export default function ViewTeam() {
  return (
    <div>
      <Menu />
      <Header />
      <Title content="Visualizar equipe" />
    </div>
  );
}
