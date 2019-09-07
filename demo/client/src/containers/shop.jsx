import React from 'react';
import { Overlay, Navbar, Alignment, Icon } from '@blueprintjs/core';
import { ShopCard } from '../components/shop-card';

const pageStyle = {
  width: '60rem',
  margin: '3rem auto 0px auto'
};

const iconStyle = {
  marginRight: '1rem'
};

export default class Shop extends React.Component {
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
            img={"https://rgmerch-a.akamaihd.net/products/production/1593-60-00/07-15-2019%2017:44:21:426_Beemo_Onesie_Human_2.png"}
            name={"Beemo Onesie"}
            price={199.99}/>
            <ShopCard 
            img={"https://www.tipsyelves.com/mas_assets/cache/image/3/4/e/5/13541/Unicorn-onesie-01.Jpg"}
            name={"Unicorn Onesie"}
            price={249.99}/>
            <ShopCard 
            img={"https://cdn.shopify.com/s/files/1/1506/4676/products/FIJI-WATER-ONESIE-VAPORWAVE-CLOTHING-AESTHETIC-NOBG_1024x1024.jpg?v=1566514854"}
            name={"Fiji Water Onesie"}
            price={149.99}/>
            <ShopCard 
            img={"https://cdn11.bigcommerce.com/s-1ddqe/images/stencil/original/products/751/1762/KFC_onesie__31578.1478762234.jpg?c=2"}
            name={"KFC Onesie"}
            price={99.99}/>
            <ShopCard 
            img={"https://www.tipsyelves.com/mas_assets/cache/image/2/e/d/4/11988.Jpg"}
            name={"America Onesie"}
            price={599.99}/>
            <ShopCard 
            img={"https://www.festival-onesies.nl/wp-content/uploads/2018/07/Dieren-onesie-haaienpak.jpg"}
            name={"Shark Onesie"}
            price={239.99}/>
        </div>
    </div>
    );
  }
}
