// AuctionContract.sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auction{
    address public auctioneer;
    uint256 public highestBid;
    address payable public highestBidder; // Change to address payable
    bool public auctionEnded;

    constructor() {
        auctioneer = msg.sender;
    }

    function placeBid() public payable {
        require(!auctionEnded, "Auction has ended");
        require(msg.value > highestBid, "Bid must be higher than current highest bid");

        if (highestBidder != address(0)) {
            highestBidder.transfer(highestBid);
        }

        highestBid = msg.value;
        highestBidder = payable(msg.sender); // Convert to address payable
    }

    function endAuction() public {
        require(msg.sender == auctioneer, "Only the auctioneer can end the auction");
        auctionEnded = true;
        highestBidder.transfer(address(this).balance);
    }

    function getHighestBid() public view returns (uint256) {
        return highestBid;
    }

    function getAuctionStatus() public view returns (bool) {
        return auctionEnded;
    }
}
