import React from 'react'
import { Card, H4 } from '@blueprintjs/core'
import './face.css'

export function Face (props) {
  const styles = {
    backgroundImage: `url(${props.img})`
  }
  console.log(props.name, props.img)
  return (
    <Card className="face-container">
      <div className="face-img-container" style={styles} />
      <H4>{props.name}</H4>
    </Card>
  )
}
