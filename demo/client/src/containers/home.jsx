import React from 'react';
import { Classes, Icon, Card, Elevation, Colors } from '@blueprintjs/core';
import { withRouter } from 'react-router-dom';

const pageStyle = {
  width: '100%',
  height: '100%'
};
const contentStyle = {
  width: '60rem',
  margin: '20% auto auto auto',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
};
const cardStyle = {
  width: '12rem',
  height: '15rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  margin: '1rem 1rem'
};
const iconStyle = {
  marginRight: 'auto',
  marginLeft: 'auto'
};
const shortcuts = [
  {
    route: 'facewall',
    name: 'FaceWall',
    icon: 'mugshot',
    color: Colors.DARK_GRAY3
  },
  {
    route: 'shop',
    name: 'Onesie Store',
    icon: 'shop',
    color: Colors.FOREST4
  }
];
export function Home() {
  const cards = shortcuts.map(shortcut => {
    return withRouter(({ history }) => (
      <Card
        className={Classes.DARK}
        style={Object.assign({backgroundColor: shortcut.color}, cardStyle)}
        interactive={true}
        onClick={() => {
          history.push('/' + shortcut.route);
        }}
        elevation={Elevation.ONE}
      >
        <Icon style={iconStyle} iconSize='100' icon={shortcut.icon}></Icon>
        <h1>{shortcut.name}</h1>
      </Card>
    ));
  });
  return (
    <div style={pageStyle}>
      <div style={contentStyle}>
        {cards.map((comp, i) => React.createElement(comp, { key: i }))}
      </div>
    </div>
  );
}
