import React, { useState } from 'react'
import { Overlay, Navbar, Alignment, Icon } from '@blueprintjs/core'
import { Face } from '../components/face'
import { FaceForm } from '../components/face-form'
import { FaceAdd } from '../components/face-add'
import { getProfile } from '../api/rest'

const pageStyle = {
  width: '60rem',
  margin: '3rem auto 0px auto'
};

const iconStyle = {
  marginRight: '1rem'
};

const dummyData = [
  {
    name: 'Philip Scott',
    img: 'https://avatars3.githubusercontent.com/u/18666879?s=400&u=612a253a6e160f917b083d7e742d1a0a7e0c19cb&v=4'
  }
]

export class Facewall extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayForm: false,
      profileList: dummyData
    }
  }

  render() {
    const { profileList, displayForm } = this.state

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
          {profileList.map((profile, i) => (
            <Face key={i} img={profile.img} name={profile.name} />
          ))}
          <FaceAdd onClick={() => this.setState({ displayForm: true })} />
          <Overlay isOpen={displayForm} onClose={() => this.setState({ displayForm: false })}>
            <FaceForm onSubmit={(profile) => {
              getProfile(profile).then(data => {
                console.log(data)
                const newProfiles = profileList.concat([{
                  name: data.full_name,
                  img: data.profile_image_url
                }])
                this.setState({
                  profileList: newProfiles,
                  displayForm: false
                })
              })
            }} />
          </Overlay>
        </div>
      </div>
    )
  }
}
