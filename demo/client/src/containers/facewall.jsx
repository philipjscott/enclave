import React from 'react'
import { Face } from '../components/face'
import {AddFace} from '../components/add-face'

const imgURL = 'https://avatars3.githubusercontent.com/u/18666879?s=400&u=612a253a6e160f917b083d7e742d1a0a7e0c19cb&v=4'
const name = 'Philip Scott'

export function Facewall () {
  return (
    <div>
      <h1>Facewall</h1>
      <Face src={imgURL} name={name} />
      <AddFace/>
    </div>
  )
}
