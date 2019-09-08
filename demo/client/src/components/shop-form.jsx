import React, { useState } from 'react';
import c from 'classnames';
import { Icon, Intent, H2, H3, FormGroup, InputGroup, Card, Button } from '@blueprintjs/core';
import { getPrivateProfile } from '../api/rest'
import './shop-form.css';

export function ShopForm(props) {
  const [profile, setProfile] = useState('');
  const [password, setPassword] = useState('');
  const [statusCode, setStatusCode] = useState(0);
  const [result, setResult] = useState(null)

  return (
    <Card className={c(props.className, 'shop-form-container')}>
      {result === null ? (
        <div>
          <h1>Buy {props.product.name}</h1>
          <h3>${props.product.price}</h3>
          <FormGroup
            label='Profile'
            labelFor='profile-id'
            helperText={statusCode === 404 ? 'Profile not found' : ''}
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
            helperText={statusCode === 401 ? 'Incorrect password' : ''}
          >
            <InputGroup
              id='password-id'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button onClick={() => {
            getPrivateProfile(profile, password)
              .then(setResult)
              .catch((err) => setStatusCode(err.response.status))
          }}>Add</Button>
        </div>
      ) : (
          <div className="shop-form-success-card">
            <Icon icon="tick-circle" iconSize={80} style={{textAlign: 'center', margin: '10px auto', dislay:'inline-block'}}intent={Intent.SUCCESS} />
            <H2>Purchased {props.product.name} for ${props.product.price}</H2>
            <br />
            <H3>Card Information</H3>
            <p>Card number: {result.credit_card.card_number}</p>
            <p>Expiry date: {result.credit_card.card_expiry}</p>
            <p>CSV: {result.credit_card.card_csv}</p>
            <Button className="shop-form-success-button" intent={Intent.SUCCESS} onClick={props.onSuccess}>Ok</Button>
          </div>
        )}
    </Card>
  );
}
