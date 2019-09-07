import React from 'react'
import { Icon, Intent, Card } from '@blueprintjs/core'
import './face-add.css'
import { IconNames } from '@blueprintjs/icons';

export function FaceAdd () {
  const iconStyle = {
    verticalAlign: 'middle'
  }
  return (
    <Card className="face-add-container">
      <Icon style={iconStyle} icon={IconNames.ADD} iconSize={40} />
    </Card>
  )
}
