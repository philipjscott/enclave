import React, { useState } from 'react'
import c from 'classnames'
import { FormGroup, InputGroup, Card, Button } from '@blueprintjs/core'
import './face-form.css'

export function FaceForm(props) {
  const [profile, setProfile] = useState('')

  return (
    <Card className={c(props.className, "face-form-container")}>
      <FormGroup
        label="Profile"
        labelFor="profile-id"
        helperText={props.error ? 'Profile not found' : ''}
      >
        <InputGroup
          id="profile-id"
          autoFocus={true}
          placeholder="sokojoe"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        />
      </FormGroup>
      <Button onClick={() => props.onSubmit(profile)} icon="add">Add</Button> 
    </Card>
  )
}
