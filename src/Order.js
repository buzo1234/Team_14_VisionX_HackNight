import React, { useContext } from 'react';
import { useNewMoralisObject, useMoralisQuery } from 'react-moralis';
import Moralis from 'moralis';
import { TransactionContext } from './context/TransactionContext';
import { Navbar } from './components';

function Order() {
  const { currentAccount } = useContext(TransactionContext);

  const Order = Moralis.Object.extend('Order');

  const { data, loading, error } = useMoralisQuery(
    'Order',
    (query) => query.equalTo('walletTo', currentAccount),
    [],
    {
      live: true,
    }
  );

  return (
    <div className='flex flex-col w-full'>
      <Navbar />
      {data.map((val, index) => (
        <div key={val + index} className='flex flex-col w-full '>
          <div className=' p-5 rounded-lg  '>{val.get('produc t_name')}</div>
        </div>
      ))}
    </div>
  );
}

export default Order;
