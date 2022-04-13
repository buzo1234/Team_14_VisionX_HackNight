import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { useNewMoralisObject } from 'react-moralis';

function Post({ name, product_name, picture, price, address }) {
  const {
    handleChange,
    sendTransaction,
    formData,
    setformData,
    isLoading,
    currentAccount,
  } = useContext(TransactionContext);
  const { save } = useNewMoralisObject('Order');

  const saveObject = async () => {
    const data = {
      walletTo: address,
      walletFrom: currentAccount,
      price: price,
      product_name: product_name,
    };

    save(data, {
      onSuccess: (order) => {},
      onError: (error) => {
        alert('Failed to create new object, with error code: ' + error.message);
      },
    });
  };

  const clickHandler = async (e) => {
    e.preventDefault();
    var data2 = {
      addressTo: address,
      amount: price,
      keyword: name,
      message: product_name,
    };

    setformData(data2);

    /*       const { addressTo, amount, keyword, message } = formData; */
    /*   
        if (!addressTo || !amount || !keyword || !message) return; */

    sendTransaction();
    await saveObject();
  };

  return (
    <div className='flex w-full h-full '>
      <div className='flex flex-col h-full bg-pink-600 rounded-lg px-5 py-2 mx-2'>
        <div className='flex w-full'>
          <p className='text-white font-extrabold text-2xl font-mono mb-5'>
            {product_name}
          </p>
        </div>
        <div className='flex w-full justify-center'>
          <img src={picture} alt='post' width={300} height={300} />
        </div>
        <div className='flex justify-between pt-4'>
          <div className='flex flex-col'>
            <div className='text-white font-mono mt-2'>{name}</div>
            <div className='text-white text-3xl font-bold'>{price} ETH</div>
          </div>
          <button
            className='bg-blue-600 p-3 rounded-lg text-xl h-30 text-white font-extrabold justify-end text-right'
            onClick={clickHandler}
          >
            Grasp!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
