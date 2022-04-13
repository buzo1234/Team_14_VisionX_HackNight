import React, { useEffect, useState } from 'react';
import { Navbar } from './components';
import { useNewMoralisObject, useMoralisQuery } from 'react-moralis';
import Moralis from 'moralis';
import Posts from './components/Posts';

function Market() {
  const Service = Moralis.Object.extend('Service');
  const query = new Moralis.Query(Service);
  // const [data, getData] = useState([]);
  const { data, loading, error } = useMoralisQuery(
    'Service',
    (query) => query.ascending('createdAt'),
    [],
    {
      live: false,
    }
  );

  console.log(data);

  return (
    <div className='flex w-full flex-col bg-black h-screen'>
      <Navbar />
      <div className='flex w-full max-w-6xl mx-auto'>
        <Posts data={data} />
      </div>
    </div>
  );
}

export default Market;
