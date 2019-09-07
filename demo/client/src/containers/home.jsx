import React from 'react';
import { Classes, Icon, Button, Card, Elevation } from '@blueprintjs/core';

const pageStyle = {
  width: '100%',
  height: '100%'
};
const contentStyle = {
  width: '60rem',
  margin: '12% auto auto auto',
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
  justifyContent: 'space-evenly'
};
const iconStyle = {
  marginRight: 'auto',
  marginLeft: 'auto'
};
export function Home() {
  return (
    <div style={pageStyle}>
      <div style={contentStyle}>
        <Card
          className={Classes.DARK}
          style={cardStyle}
          interactive={true}
          elevation={Elevation.ONE}
        >
          <Icon style={iconStyle} iconSize='100' icon='mugshot'></Icon>
          <h1>FaceWall</h1>
        </Card>
      </div>
    </div>
  );
}
