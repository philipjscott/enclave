import React from 'react';
import { Overlay, Navbar, Alignment, Icon } from '@blueprintjs/core';
import { ShopCard } from '../components/shop-card';
import { ShopForm } from '../components/shop-form';

const pageStyle = {
  width: '60rem',
  margin: '3rem auto 0px auto'
};

const iconStyle = {
  marginRight: '1rem'
};

const itemOne = {
  name: 'Beemo Onesie',
  price: 200.0
};

export default class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      displayForm: false,
      selectedProduct: null
    };
  }

  render() {
    return (
      <div>
        <Navbar className='bp3-dark'>
          <Navbar.Group align={Alignment.CENTER}>
            <Navbar.Heading>
              <Icon
                style={iconStyle}
                iconSize={Icon.SIZE_LARGE}
                icon='shop'
              ></Icon>
              Onesies.com
            </Navbar.Heading>
          </Navbar.Group>
        </Navbar>
        <div style={pageStyle}>
          <ShopCard
            img={
              'https://rgmerch-a.akamaihd.net/products/production/1593-60-00/07-15-2019%2017:44:21:426_Beemo_Onesie_Human_2.png'
            }
            name={'Beemo Onesie'}
            price={199.99}
            onClick={() =>
              this.setState({
                displayForm: true,
                selectedProduct: 'Beemo Onesie'
              })
            }
          />
        </div>
        <Overlay
          isOpen={this.state.displayForm}
          onClose={() => this.setState({ displayForm: false })}
        >
          <ShopForm
            error={this.state.error}
            productName={this.state.selectedProduct}
          />
        </Overlay>
      </div>
    );
  }
}
