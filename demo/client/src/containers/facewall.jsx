import React from 'react';
import { Face } from '../components/face';
import { FaceAdd } from '../components/face-add';
import { Navbar, Alignment, Icon } from '@blueprintjs/core';

const imgURL =
  'https://avatars3.githubusercontent.com/u/18666879?s=400&u=612a253a6e160f917b083d7e742d1a0a7e0c19cb&v=4';
const name = 'Philip Scott';

const pageStyle = {
  width: '60rem',
  margin: '3rem auto 0px auto'
};

const iconStyle = {
  marginRight: '1rem'
};

export function Facewall() {
  return (
    <div>
      <Navbar className='bp3-dark'>
        <Navbar.Group align={Alignment.CENTER}>
          <Navbar.Heading>
            <Icon
              style={iconStyle}
              iconSize={Icon.SIZE_LARGE}
              icon='mugshot'
            ></Icon>
            Facewall
          </Navbar.Heading>
        </Navbar.Group>
      </Navbar>
      <div style={pageStyle}>
        <Face src={imgURL} name={name} />
        <FaceAdd onClick={() => console.log('hi')} />
      </div>
    </div>
  );
}
