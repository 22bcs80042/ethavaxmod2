# ethavaxmod2
#  create a Auction app frontend and deploy it on the Localhost network
This repository is made for my ethereum intermediate avax mod 2 project which is used to create a Frontend app for Auction and run it on localhost network.

## Problem Statement
create a simple contract frontend  with 2-3 function.
## Description
This program  written in Solidity by using a simple contract, solidity is  a programming language used for developing smart contracts on the Ethereum blockchain. 
This Solidity smart contract defines an auction system with the following functionality:
Contract Variables:
1.auctioneer: An address variable to store the Ethereum address of the auctioneer, who initiates the auction.
2.highestBid: A uint256 variable to store the highest bid amount.
3.highestBidder: An address payable variable to store the address of the highest bidder. It's marked as `payable` so that it can receive Ether.
4.auctionEnded: A boolean variable to indicate whether the auction has ended or not.
Constructor: The contract's constructor is executed when the contract is deployed. It sets the `auctioneer` variable to the Ethereum address of the contract deployer (msg.sender).
placeBid Function:
placeBid is a public function that allows users to place bids in the auction. It requires the auction to not have ended and the bid to be higher than the current highest bid.
If there's already a highest bidder, their bid is refunded to them.
The function then updates the `highestBid` and `highestBidder` variables with the new bid and bidder's address respectively.
endAuction Function:
endAuction` is a public function that allows only the auctioneer to end the auction.
It sets the `auctionEnded` flag to true and transfers the contract's balance (the collected bids) to the highest bidder.
getHighestBid Function: A public view function that returns the current highest bid amount.
getAuctionStatus Function: A public view function that returns the status of the auction (whether it has ended or not).
This contract is a simple auction where participants can place bids, the highest bidder wins, and the auctioneer can end the auction. The contract's state variables store important information about the auction, and the functions provide the logic for placing bids and ending the auction.
## Getting Started

### Executing Program
To run this CONTRACT we use VS CODE IDE. 
Install project dependencies by running: npm install
Start the local Ethereum network (Hardhat's built-in node) by running: npx hardhat node
In a new terminal, deploy the contract to the local network by running: npx hardhat run deploy.js --network localhost
Note down the deployed contract address as it will be required in the frontend.
Start the React frontend by running: npm start.It will redirect to our localhost frontend page and then put the auction value and then it will ask confirmation of transaction from metamask wallet.

## Author

Sulochana

## License

This project is licensed under the MIT License - see the LICENSE file for details
