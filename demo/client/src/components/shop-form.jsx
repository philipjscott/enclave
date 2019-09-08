import React, { useState } from 'react';
import c from 'classnames';
import { FormGroup, InputGroup, Card, Button } from '@blueprintjs/core';
import './shop-form.css';

export function ShopForm(props) {
  const [profile, setProfile] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card className={c(props.className, 'shop-form-container')}>
      <h1>Buy {props.product.name}</h1>
      <h3>${props.product.price}</h3>
      <FormGroup
        label='Profile'
        labelFor='profile-id'
        helperText={props.error ? 'Profile not found' : ''}
      >
        <InputGroup
          id='profile-id'
          autoFocus={true}
          placeholder='sokojoe'
          value={profile}
          onChange={e => setProfile(e.target.value)}
        />
      </FormGroup>
      <FormGroup
        label='Password'
        labelFor='password-id'
      >
        <InputGroup
          id='password-id'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FormGroup>
      <Button onClick={() => console.log(profile, password)}>Add</Button>
    </Card>
  );
}
