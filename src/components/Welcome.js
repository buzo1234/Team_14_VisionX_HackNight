import React, { useContext, useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { TransactionContext } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAddress';
import { Loader } from '.';
import { create } from 'ipfs-http-client';

const client = create('https://ipfs.infura.io:5001/api/v0');

const companyCommonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step='0.0001'
    value={value}
    onChange={(e) => handleChange(e, name)}
    className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism'
  />
);

const Welcome = () => {
  const {
    currentAccount,
    connectWallet,
    disconnectWallet,
    handleChange,
    sendTransaction,
    formData,
    setformData,
    isLoading,
  } = useContext(TransactionContext);

  const [fileUrl, setFileUrl] = useState(``);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `http://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
      setformData((prevState) => ({ ...prevState, ['message']: url }));
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div className='flex w-full justify-center items-center'>
      <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
        <div className='flex flex-1 justify-start items-start flex-col mf:mr-10'>
          <h1 className='text-xl sm:text-5xl text-white text-gradient py-1 font-mono'>
            <span className='line-through text-red-600'>Commission</span>{' '}
            Marketplace for
            <br /> Products & Services
          </h1>
          <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base font-mono'>
            Explore this decentralized world. Buy and sell with cryptocurrencies
            easily.
          </p>
          {!currentAccount ? (
            <button
              type='button'
              onClick={connectWallet}
              className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'
            >
              <AiFillPlayCircle className='text-white mr-2' />
              <p className='text-white text-base font-semibold'>
                Connect Wallet
              </p>
            </button>
          ) : (
            <button
              type='button'
              onClick={disconnectWallet}
              className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'
            >
              <AiFillPlayCircle className='text-white mr-2' />
              <p className='text-white text-base font-semibold'>
                DisConnect Wallet
              </p>
            </button>
          )}
          <div className='flex w-full justify-center font-mono'>
            <p className='text-center text-white text-2xl'>We Offer</p>
          </div>

          <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>

        <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 '>
          <div className='p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism  bg-blue-600'>
            <div className='flex justify-between flex-col w-full h-full'>
              <div className='flex justify-between items-start'>
                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                  <SiEthereum fontSize={21} color='#fff' />
                </div>
                <BsInfoCircle fontSize={17} color='#fff' />
              </div>
              <div>
                <p className='text-white font-light text-sm'>
                  {shortenAddress(currentAccount)}
                </p>
                <p className='text-white font-semibold text-lg mt-1'>
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          {/* <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'>
            <Input
              placeholder='Address To'
              name='addressTo'
              type='text'
              handleChange={handleChange}
            />
            <Input
              placeholder='Amount (ETH)'
              name='amount'
              type='number'
              handleChange={handleChange}
            />
            <Input
              placeholder='Keyword (Gif)'
              name='keyword'
              type='text'
              handleChange={handleChange}
            />
            <Input
              placeholder='Enter Message'
              name='message'
              type='file'
              handleChange={handleFile}
            />

            <div className='h-[1px] w-full bg-gray-400 my-2' />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type='button'
                onClick={handleSubmit}
                className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer'
              >
                Send now
              </button>
            )}
          </div> */}
          <div className='flex justify-center items-center'>
            <p className='text-white text-xl mr-3 font-mono'>Go to </p>
            <Link to='/market'>
              <button
                type='button'
                className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-lg cursor-pointer hover:bg-[#2546bd]'
              >
                <AiFillPlayCircle className='text-white mr-2' />
                <p className='text-white text-base font-semibold'>Market</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
