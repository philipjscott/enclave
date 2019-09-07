import React from 'react'
import { Icon, Intent, Card } from '@blueprintjs/core'
import './face-add.css'
import { IconNames } from '@blueprintjs/icons';

export function FaceAdd (props) {
  const iconStyle = {
    verticalAlign: 'middle',
    color: '#bbb'
  }
  return (
    <Card className="face-add-container" interactive={true} onClick={props.onClick}>
      <Icon style={iconStyle} icon={IconNames.ADD} iconSize={40} />
    </Card>
  )
}
