import React, { useState, useEffect } from 'react';
import './App.css';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import AuctionABI from './contracts/AuctionABI.json';

const App = () => {
  const [auctioneer, setAuctioneer] = useState('');
  const [highestBid, setHighestBid] = useState(0);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);

  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with the actual contract address
  const contractABI = AuctionABI.abi;

  useEffect(() => {
    const initializeProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        setProvider(new ethers.providers.Web3Provider(provider));
      } else {
        console.error('Please install Metamask to interact with the wallet.');
      }
    };

    initializeProvider();
  }, []);

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(contractAddress, contractABI, signer));
    }
  }, [provider]);

  const fetchData = async () => {
    if (contract) {
      try {
        const [auctioneerAddr, highestBidValue, auctionEndedStatus] = await Promise.all([
          contract.auctioneer(),
          contract.getHighestBid(),
          contract.getAuctionStatus()
        ]);

        setAuctioneer(auctioneerAddr);
        setHighestBid(highestBidValue.toNumber());
        setAuctionEnded(auctionEndedStatus);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const placeBid = async () => {
    if (contract && bidAmount > highestBid) {
      console.log('Placing bid:', bidAmount);
      try {
        const tx = await contract.placeBid({ value: ethers.utils.parseEther(bidAmount.toString()) });
        console.log('Transaction:', tx);
        await tx.wait();
        console.log('Transaction mined');
        fetchData();
      } catch (error) {
        console.error('Error placing bid:', error);
      }
    }
  };
  

  return (
    <div className="App">
      <h1>Auction Contract Frontend</h1>
      <div>
        <h2>Auctioneer</h2>
        <p>{auctioneer}</p>
      </div>
      <div>
        <h2>Highest Bid</h2>
        <p>{highestBid}</p>
      </div>
      <div>
        <h2>Auction Ended</h2>
        <p>{auctionEnded ? 'Yes' : 'No'}</p>
      </div>
      <div>
        <input
          type="number"
          placeholder="Enter bid amount in Ether"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />
        <button onClick={placeBid}>Place Bid</button>
      </div>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

export default App;
