import React from 'react';
import { Card, H4 } from '@blueprintjs/core';
import './shop-card.css';

export function ShopCard(props) {
  const styles = {
    backgroundImage: `url(${props.img})`
  };
  console.log(props.name, props.price, props.img);
  return (
    <Card className='shop-card-container' interactive={true}>
      <div className='shop-card-img-container' style={styles} />
      <H4>{props.name}</H4>
      <p>${props.price}</p>
    </Card>
  );
}
