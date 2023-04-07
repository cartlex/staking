// SPDX-License-Identifier: MIT
pragma solidity^0.8.17;

import "./ERC20.sol";

/// @title Rewarding token contract
/// @author cartlex

contract RewardingToken is ERC20 {
    uint constant public TOKEN_SUPPLY = 3 * 10 ** 28;

    constructor() ERC20("RewardingToken", "RW") {
        _mint(msg.sender, TOKEN_SUPPLY);
    }
}