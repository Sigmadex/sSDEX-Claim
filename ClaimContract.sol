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
        uint withdrawnTokens;
        bool withdrew; // Has he withdrawn his tokens?
    }
    struct Claim2 {
        uint transaction; // Number of the transaction
        uint time; // Time tx was made
        address user; // User claiming
        uint holdAmount; // Amount of Avax he holds before 01/01/2022
        uint amount; // Amount claimed
    }

    // Set important mappings for data retrieval
    mapping(address => bool) public whitelisted; // Mapping that tracks if user is whitelisted
    mapping(address => bool) public claimedTokens; // Simple mapping that tracks if user has made his claim
    mapping(address => Claim) public claims; // Mapping that tracks each address to claim info
    mapping(uint256 => Claim2) public transaction; // Mapping that tracks TxID to claim info

    // Events emited for EVM
    event LogUserAdded(address user); // Event when User is Added
    event LogUserRemoved(address user); // Event when User is Removed
    event claimReset(uint reset);
    event LogClaim( // Event when a claim is made
        uint256 txId, 
        uint timeStamp, 
        address indexed user, 
        uint indexed avaxAmount, 
        uint indexed claimedTokens);    
    event LogWithdrawal(address user, uint amount); // Event when User withdraws
    event LogStatus(bool withdrawalStatus); // Event when withdrawals are activated
    
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
        uint amountToClaim = _avaxAmount/1000;
        require(token.balanceOf(address(this)) >= tokensClaimed, "We have distribute all tokens"); // Check if all available tokens have been already claimed
        address from = msg.sender; // We mke a variable to store the sender address
        require(whitelisted[from] == true,"You are not qualified for this claim"); // Check Whitelist to see if user is listed
        require(claimedTokens[from] == false , "You have already withdrawn"); // User can only claim once
        uint claimAmount; // We get the Avax amount to proccess how much tokens user recieves
        if (amountToClaim >= 100) { 
            claimAmount = 12500; // If _avaxAmount >= 100 then recieve 12500 full tokens
        } else if (amountToClaim < 100 && amountToClaim >= 10) {
            claimAmount = 5000; // If 10 =< _avaxAmount < 100 then recieve 5000 full tokens
        } else if (amountToClaim < 10 && amountToClaim >= 1) {
            claimAmount = 1000; // If 1 =< _avaxAmount < 10 then recieve 1000 full tokens
        } else if (amountToClaim < 1 && _avaxAmount > 0) {
            claimAmount = 250; // If 0 < _avaxAmount < 1 then recieve 250 full tokens
        } else {
            claimAmount = 0; // Else no token
        }
        uint tokenAmount = (claimAmount*(10**18)); // Claim amount to gei value
        require(tokenAmount > 0, "Token amount is 0"); // Token amount must be bigger than 0
        tokensClaimed += tokenAmount; // We increment the claimed tokens count for each claim
        allTokensClaimed += tokenAmount; // Nonreset claim counter
        transactionCount++; // We increment by one the transaction count for each claim
        claimedTokens[from] = true; // We set that user has claimed tokens
        transaction[transactionCount] = Claim2(transactionCount, block.timestamp, from, amountToClaim, tokenAmount); // Mapping of txid to each user transactions
        claims[from] = Claim(transactionCount, block.timestamp, from, amountToClaim, tokenAmount, 0, false); // Mapping of address to each user transactions
        emit LogClaim(transactionCount, block.timestamp, from, amountToClaim, tokenAmount); // Full graph log emitted for claim
    }

    // Main Refer Claim function
    function claimRef(address _ref, uint _avaxAmount) external  {
        uint amountToClaim = _avaxAmount/1000;
         uint claimAmount; // We get the Avax amount to proccess how much tokens user recieves
        if (amountToClaim >= 100) { 
            claimAmount = 12550*(10**18); // If _avaxAmount >= 100 then recieve 12500 full tokens
        } else if (amountToClaim < 100 && amountToClaim >= 10) {
            claimAmount = 5050*(10**18); // If 10 =< _avaxAmount < 100 then recieve 5000 full tokens
        } else if (amountToClaim < 10 && amountToClaim >= 1) {
            claimAmount = 1050*(10**18); // If 1 =< _avaxAmount < 10 then recieve 1000 full tokens
        } else if (amountToClaim < 1 && _avaxAmount > 0) {
            claimAmount = 300*(10**18); // If 0 < _avaxAmount < 1 then recieve 250 full tokens
        } else {
            claimAmount = 50*(10**18); // Else no token
        }
        Claim storage claim = claims[_ref]; // We look for the claiming info from the refferer
        address from = msg.sender; // We mke a variable to store the sender address
        require(claimedTokens[from] == false , "You have already withdrawn"); // Check if referal is valid
        require(claimedTokens[_ref] == true, "Ref-Link invalid"); // User can only claim once
        uint refAmount = (10*(10**18)); // Referal amount to gei value - 10 tokens
        uint totalTokensClaimed = claimAmount + refAmount;
        require(tokensClaimed <= token.balanceOf(address(this)), "Limit of claims exceeded"); // Users can only claim the balance amount of the contract
        tokensClaimed += totalTokensClaimed; // We increment by one the claimed tokens count for each claim
        allTokensClaimed += totalTokensClaimed; // Nonreset claim counter
        transactionCount++; // We increment by one the transaction count for each claim
        claimedTokens[from] = true; // We set that user has claimed tokens
        transaction[transactionCount] = Claim2(transactionCount, block.timestamp, from, amountToClaim, totalTokensClaimed); // Mapping of txid to each user transactions
        claims[from] = Claim(transactionCount, block.timestamp, from, amountToClaim, claimAmount, 0, false); // Create a mapping for the new user address
        claims[_ref] = Claim(claim.transaction , claim.time, claim.user, claim.holdAmount, (claim.amount + refAmount), 0, false); // We update the mapping of the user who gave the referal to add more tokens
        emit LogClaim(transactionCount, block.timestamp, from, amountToClaim, totalTokensClaimed); // Full graph log emitted for claim
    }

    //Withdrawal function
    function withdrawTokens() external withdrawApproved {
        address from = msg.sender; // We mke a variable to store the sender address
        Claim storage claim = claims[from]; // We call the variable on storage to use in the function
        require(claim.withdrew == false, "You already withdrew"); // user can only withdrew once
        require(claim.amount >= 0, "only users that have claimed before"); // User mut have made a claim action before withdrawal
        require(claim.withdrawnTokens == 0, "Tokens were already withdrawn"); // Check for user withdrawal
        require(token.transfer(from, claim.withdrawnTokens),"Tokens cannot be transfered, check gas");
        claim.withdrawnTokens = claim.amount; // We let the contract know that this user has already claimed
        claim.withdrew = true;
        emit LogWithdrawal(msg.sender, claim.amount); // Full graph log emitted for withdrawal
    }

    // Function to finish clail and retriev tokens (Can also implement selfdistruct of contract) 
    function finishClaim() public onlyAdmin {
        uint256 amountLeft = token.balanceOf(address(this)); // We set amount of tokens left in a variable
        require(token.transfer(admin, amountLeft), "Could'nt send tokens to admin"); // We transfer remaining tokens to admin of the contract
        // selfdestruct(payable(admin));
    }

}
