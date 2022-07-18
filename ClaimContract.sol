// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// Import token contract to manage the claim token
import './ClaimToken.sol';

// Initiate contract
contract ClaimContract {

    // Set singular variables
    address public admin; // Contract admin
    ClaimToken public token; // ERC20 token Interface 
    uint256 public tokensClaimed; // Total amount of tokens claimed in this round
    uint256 public allTokensClaimed; // Total amount of tokens claimed
    uint256 public transactionCount; // Total amount of claim transactions
    bool public canWithdraw; // Activate or Deactivate withdrawal feature


    // Set a struct to contain the user claim info
    struct Claim {
        uint transaction; // Number of the transaction
        uint time; // Time tx was made
        address user; // User claiming
        uint holdAmount; // Amount of Avax he holds before 01/01/2022
        uint amount; // Amount claimed
        uint withdrawnTokens; // Has he withdrawn histokens?
    }

    // Set important mappings for data retrieval
    mapping(address => bool) public whitelisted; // Mapping that tracks if user is whitelisted
    mapping(address => bool) public claimedTokens; // Simple mapping that tracks if user has made his claim
    mapping(address => Claim) public claims; // Mapping that tracks each address to claim info
    mapping(uint256 => Claim) public transaction; // Mapping that tracks TxID to claim info

    // Events emited for Graph
    event LogUserAdded(address user); // Event when User is Added
    event LogUserRemoved(address user); // Event when User is Removed
    event claimReset(uint reset);
    event LogClaim(
        uint256 txId, 
        uint timeStamp, 
        address indexed user, 
        uint indexed avaxAmount, 
        uint indexed claimedTokens
    ); // Event when User claims
    event LogWithdrawal(address user, uint amount); // Event when User withdraws
    event LogStatus(bool withdrawalStatus);
    
    // Contract Cunstructor
    constructor(ClaimToken _token) {
        token = _token; // Token address of the claim token
        admin = msg.sender; // Sets the contract uploader the admin
        canWithdraw = false; // Withdrawal function set to false by  default
    }
    
    // Modifier for OnlyAdmin calls
    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin"); 
        _; // msg.sender must be admin to proceed
    }

    // Modifier to let users withdraw
    modifier withdrawApproved() {
        require(canWithdraw == true, "Withdrawal is not allowed");
        _; // canWithdraw must be True to proceed
    }

    // Function to reset the claimed amount in order to restock the contract and use it again with same logs
    function resetTokenCount() external onlyAdmin{ // OnlyAdmin can call
        tokensClaimed = 0; // Set tokensclaimed to 0
        emit claimReset(0); // Emit the reset
    }


    // Function to add single user to Whitelist
    function addUser(address user) external onlyAdmin { // Only admin can call
        whitelisted[user] = true; // Set whitelisted to True
        emit LogUserAdded(user); // Emit event
    }

    // Function to remove single user from Whitelist
    function removeUser(address user) external onlyAdmin { // Only admin can call
        whitelisted[user] = false; // Set whitelisted to False
        emit LogUserRemoved(user); // Emit event
    }

    // Function to add multiple users to Whitelist
    function addManyUsers(address[] memory users) external onlyAdmin { // Only admin can call
        require(users.length < 1000); // Maximum Input of addresses 1K (1000)
        for (uint256 index = 0; index < users.length; index++) { // Map and add each user 1 by 1
            whitelisted[users[index]] = true; // Set whitelisted to True
            emit LogUserAdded(users[index]); // Emit event
        }
    }
    
    // Function to allow admin activate withdrawal
    function approveWithdraw() external onlyAdmin {
        canWithdraw = true; // set windrawal to True
        emit LogStatus(canWithdraw); // Emit the status of token withdrawal
    }

    // Function to allow admin activate withdrawal
    function disableWithdraw() external onlyAdmin {
        canWithdraw = false; // set windrawal to False
    emit LogStatus(canWithdraw); // Emit the status of token withdrawal
    }

    // Main Claiming function (Public function can be alled by anyone)
    function claimTokens(uint _avaxAmount) external  {
        require(token.balanceOf(address(this)) >= tokensClaimed, "We have distribute all tokens"); // Check if all available tokens have been already claimed
        address from = msg.sender; // We mke a variable to store the sender address
        require(whitelisted[from] == true,"You are not qualified for this claim"); // Check Whitelist to see if user is listed
        require(claimedTokens[from] == false , "You have already withdrawn"); // User can only claim once
        uint claimAmount; // We get the Avax amount to proccess how much tokens user recieves
        if (_avaxAmount >= 100) { 
            claimAmount = 12500; // If _avaxAmount >= 100 then recieve 12500 full tokens
        } else if (_avaxAmount < 100 && _avaxAmount >= 10) {
            claimAmount = 5000; // If 10 =< _avaxAmount < 100 then recieve 5000 full tokens
        } else if (_avaxAmount < 10 && _avaxAmount >= 1) {
            claimAmount = 1000; // If 1 =< _avaxAmount < 10 then recieve 1000 full tokens
        } else if (_avaxAmount < 1 && _avaxAmount > 0) {
            claimAmount = 250; // If 0 < _avaxAmount < 1 then recieve 250 full tokens
        } else {
            claimAmount = 0; // Else no token
        }
        uint tokenAmount = (claimAmount*(10**18)); // Claim amount to gei value
        require(tokenAmount > 0, "Token amount is 0"); // Token amount must be bigger than 0
        require(tokensClaimed <= token.balanceOf(address(this)), "Limit of claims exceeded"); // Users can only claim the balance amount of the contract
        tokensClaimed += tokenAmount; // We increment the claimed tokens count for each claim
        allTokensClaimed += tokenAmount; // Nonreset claim counter
        transactionCount++; // We increment by one the transaction count for each claim
        claimedTokens[from] = true; // We set that user has claimed tokens
        transaction[transactionCount] = Claim(transactionCount, block.timestamp, from, _avaxAmount, tokenAmount, tokenAmount); // Mapping of txid to each user transactions
        claims[from] = Claim(transactionCount, block.timestamp, from, _avaxAmount, tokenAmount, tokenAmount); // Mapping of address to each user transactions
        emit LogClaim(transactionCount, block.timestamp, from, _avaxAmount, tokenAmount); // Full graph log emitted for claim
    }

    // Main Refer Claim function
    function claimRef(address _ref) external  {
        Claim storage claim = claims[_ref]; // We look for the claiming info from the refferer
        address from = msg.sender; // We mke a variable to store the sender address
        require(claimedTokens[from] == false , "You have already withdrawn"); // Check if referal is valid
        require(claimedTokens[_ref] == true, "Ref-Link invalid"); // User can only claim once
        uint tokenAmount = (50*(10**18));  // Claim amount to gei value - 50 tokens
        uint refAmount = (10*(10**18)); // Referal amount to gei value - 10 tokens
        require(tokensClaimed <= token.balanceOf(address(this)), "Limit of claims exceeded"); // Users can only claim the balance amount of the contract
        tokensClaimed += (tokenAmount+refAmount); // We increment by one the claimed tokens count for each claim
        allTokensClaimed += (tokenAmount+refAmount); // Nonreset claim counter
        transactionCount++; // We increment by one the transaction count for each claim
        claimedTokens[from] = true; // We set that user has claimed tokens
        transaction[transactionCount] = Claim(transactionCount, block.timestamp, from, 0, (tokenAmount + refAmount), (tokenAmount + refAmount)); // Mapping of txid to each user transactions
        claims[from] = Claim(transactionCount, block.timestamp, from, 0, tokenAmount, tokenAmount); // Create a mapping for the new user address
        claims[_ref] = Claim(claim.transaction , claim.time, claim.user, claim.holdAmount, (claim.amount + refAmount), (claim.withdrawnTokens+ refAmount)); // We update the mapping of the user who gave the referal to add more tokens
        emit LogClaim(transactionCount, block.timestamp, from, 0, tokenAmount); // Full graph log emitted for claim
    }

    //Withdrawal function
    function withdrawTokens() external withdrawApproved {
        address from = msg.sender; // We mke a variable to store the sender address
        Claim storage claim = claims[from]; // We call the variable on storage to use in the function
        require(claim.amount >= 0, "only users that have claimed before"); // User mut have made a claim action before withdrawal
        require(claim.withdrawnTokens >= 0, "Tokens were already withdrawn"); // Check for user withdrawal
        require(token.transfer(from, claim.withdrawnTokens),"Tokens cannot be transfered, check gas");
        claim.withdrawnTokens = 0; // We let the contract know that this user has already claimed
        emit LogWithdrawal(msg.sender, claim.amount); // Full graph log emitted for withdrawal
    }

    // Function to finish clail and retriev tokens (Can also implement selfdistruct of contract) 
    function finishClaim() public onlyAdmin {
        uint256 amountLeft = token.balanceOf(address(this)); // We set amount of tokens left in a variable
        require(token.transfer(admin, amountLeft), "Could'nt send tokens to admin"); // We transfer remaining tokens to admin of the contract
        // selfdestruct(payable(admin));
    }

}
