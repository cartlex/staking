// SPDX-License-Identifier: MIT
pragma solidity^0.8.17;

import "./ERC20.sol";

/// @title Staking token contract
/// @author cartlex

contract StakingToken is ERC20 {
    uint constant public supply = 1e18;

    constructor() ERC20("StakingToken", "ST") {
        _mint(msg.sender, supply);
    }
}
