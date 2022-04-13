import React, { useState, useContext } from 'react';
import { useNewMoralisObject } from 'react-moralis';
import { Loader } from '.';
import { create } from 'ipfs-http-client';
import { TransactionContext } from '../context/TransactionContext';
const client = create('https://ipfs.infura.io:5001/api/v0');
function MoralisIn() {
  const { save } = useNewMoralisObject('Service');
  const { currentAccount, isLoading } = useContext(TransactionContext);
  const [name, setName] = useState('');
  const [address, setAddress] = useState(currentAccount);
  const [pname, setPname] = useState('');
  const [price, setPrice] = useState(0);

  const [fileUrl, updateFileUrl] = useState(``);
  const [id, getId] = useState();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateFileUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  const saveObject = async () => {
    const data = {
      wallet: address,
      name: name,
      product_name: pname,
      price: price,
      picture: fileUrl,
    };

    save(data, {
      onSuccess: (service) => {
        getId(service.id);
        alert('Done!! Welcome to our Metaverse Marketplace');
      },
      onError: (error) => {
        alert('Failed to create new object, with error code: ' + error.message);
      },
    });
  };

  return (
    <div className='p-5 sm:w-96 flex flex-col justify-center w-full items-center blue-glassmorphism bg-black  rounded-xl p-10 m-10 mx-auto '>
      <input
        placeholder='Enter your Name'
        name='name'
        type='text'
        onChange={(e) => setName(e.target.value)}
        className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-white border-2 border-solid text-sm white-glassmorphism'
      />

      <input
        placeholder='Product/Service Name'
        name='productName'
        type='text'
        onChange={(e) => setPname(e.target.value)}
        className='border-white border-2 border-solid my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white  text-sm white-glassmorphism'
      />
      <input
        placeholder='Enter Price'
        name='price'
        type='number'
        onChange={(e) => setPrice(e.target.value)}
        className='border-white border-2 border-solid my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism'
      />
      <input
        placeholder='Post related picture!'
        name='pic'
        type='file'
        onChange={onChange}
        className='border-white border-2 border-solid my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white  text-sm white-glassmorphism'
      />

      <div className='h-[1px] w-full bg-gray-400 my-2' />

      {isLoading ? (
        <Loader />
      ) : (
        <button
          type='button'
          onClick={saveObject}
          className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer'
        >
          Enter MetaVerse
        </button>
      )}
    </div>
  );
}

export default MoralisIn;
