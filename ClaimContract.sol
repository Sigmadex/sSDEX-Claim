// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './ClaimToken.sol';

contract ClaimContract {

    address public admin;
    ClaimToken public token;
    uint256 public tokensClaimed;
    uint256 public transactionCount;

    // mapping(address => bool) public whitelisted;
    // event LogUserAdded(address user);
    event LogWithdrawal(
        uint256 txId, 
        uint timeStamp, 
        address indexed user, 
        uint indexed avaxAmount, 
        uint indexed claimedTokens
        );

    struct Claim {
        uint transaction;
        uint time;
        address investor;
        uint holdAmount;
        uint tokensWithdrawn;
    }

    mapping(address => bool) public claimedTokens;
    // mapping(address => Claim) public claims;
    // mapping(uint256 => Claim) public transaction;

    constructor(ClaimToken _token) {
        token = _token;
        admin = msg.sender;
    }

    function withdrawTokens(uint _avaxAmount) external  {

          // require(whitelisted[user] = true,"You are not qualified for this claim")
        address from = msg.sender;
        uint claimAmount;
        if (_avaxAmount >= 100) {
            claimAmount = 12500;
        } else if (_avaxAmount < 100 && _avaxAmount >= 10) {
            claimAmount = 5000;
        } else if (_avaxAmount < 10 && _avaxAmount >= 1) {
            claimAmount = 1000;
        } else if (_avaxAmount < 1 && _avaxAmount > 0) {
            claimAmount = 250;
        } else {
            claimAmount = 0;
        }

        uint tokenAmount = (claimAmount*(10**18));
        require(claimedTokens[from] == false , "You have already withdrawn");
        require(tokenAmount > 0, "Token amount is 0");
        require(token.balanceOf(address(this)) >= tokenAmount, "More than available on contract");
        require(token.transfer(from, tokenAmount),"Tokens cannot be transfered without gas");
        tokensClaimed += tokenAmount;
        transactionCount++;
        claimedTokens[from] = true;
        // transaction[transactionCount] = Claim(transactionCount, block.timestamp, from, _avaxAmount, tokenAmount);
        // claims[from] = Claim(transactionCount, block.timestamp, from, _avaxAmount, tokenAmount);
        emit LogWithdrawal(transactionCount, block.timestamp, from, _avaxAmount, tokenAmount);
    }

    function withdrawRef(address _ref) external  {
        address from = msg.sender;
        require(claimedTokens[from] == false , "You have already withdrawn");
        require(claimedTokens[_ref] == true, "User hasn't claimed tokens");
        uint tokenAmount = (50*(10**18));
        uint refAmount = (10*(10**18));
        require(token.balanceOf(address(this)) >= tokenAmount, "More than available on contract");
        require(token.transfer(from, tokenAmount),"Tokens cannot be transfered without gas");
        require(token.transfer(_ref, refAmount),"Tokens cannot be transfered without gas");
        tokensClaimed += tokenAmount;
        transactionCount++;
        claimedTokens[from] = true;
        // transaction[transactionCount] = Claim(transactionCount, block.timestamp, from, 0, tokenAmount);
        // claims[from] = Claim(transactionCount, block.timestamp, from, 0, tokenAmount);
        emit LogWithdrawal(transactionCount, block.timestamp, from, 0, tokenAmount);
    }

    function finishClaim() public onlyAdmin {
        uint256 amountLeft = token.balanceOf(address(this));
        require(token.transfer(admin, amountLeft), "Could'nt send tokens to admin");
        selfdestruct(payable(admin));
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    }

    // // Function that adds a user to the whitelist - Only can be called by admin
    // function addUser(address user) external onlyAdmin {
    //     // We set the address of user to add to the whitelist
    //     whitelisted[user] = true;
    //     // We emit the address of the user whitelisted
    //     emit LogUserAdded(user);
    // }

}
