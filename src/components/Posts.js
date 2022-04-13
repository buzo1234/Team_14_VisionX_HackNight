import React from 'react';
import Post from './Post';

function Posts({ data }) {
  console.log('from posts', data);
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mx-auto justify-center items-center h-full'>
      {data.map((val, index) => (
        <Post
          key={val + index}
          name={val.get('name')}
          product_name={val.get('product_name')}
          price={val.get('price')}
          picture={val.get('picture')}
          address={val.get('wallet')}
        />
      ))}
    </div>
  );
}

export default Posts;
