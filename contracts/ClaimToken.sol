// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/ERC20.sol)

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract ClaimToken is ERC20 {
    constructor() ERC20("Claim Token", "CT") {
        _mint(msg.sender, 10000000 * 10**18);
    }
}