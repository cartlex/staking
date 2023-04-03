// SPDX-License-Identifier: MIT
pragma solidity^0.8.17;

import "./IERC20.sol";

/// @title Staking contract
/// @author cartlex

contract Staking {
    IERC20 public rewardsToken;
    IERC20 public stakingToken;

    uint public constant REWARD_RATE = 1;
    uint public lastUpdateTime;
    uint public rewardPerTokenStored;

    mapping(address => uint) public userRewardPerTokenPaid;
    mapping(address => uint) public rewards;
    mapping(address => uint) public _balances;

    uint private _totalSupply;

    constructor(address _stakingToken, address _rewardsToken) {
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
    }

    modifier updateReward(address _account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        rewards[_account] = earned(_account);
        userRewardPerTokenPaid[_account] = rewardPerTokenStored;
        _;
    }

    function stake(uint amount) external updateReward(msg.sender) {
        _totalSupply += amount;
        _balances[msg.sender] += amount;
        stakingToken.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw(uint _amount) external updateReward(msg.sender) {
        require(_balances[msg.sender] >= _amount, "not enough tokens");
        _totalSupply -= _amount;
        _balances[msg.sender] -= _amount;
        stakingToken.transfer(msg.sender, _amount);
    }

    function getReward() external updateReward(msg.sender) {
        uint reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        rewardsToken.transfer(msg.sender, reward);
    }

    function rewardPerToken() public view returns(uint) {
        if(_totalSupply == 0) {
            return 0;
        }
        
        return rewardPerTokenStored + (
            REWARD_RATE * (block.timestamp - lastUpdateTime)
        ) * 1e18 / _totalSupply;
    }

    function earned(address _account) public view returns(uint) {
        return (_balances[_account] * (rewardPerToken() - userRewardPerTokenPaid[_account]) / 1e18) + rewards[_account];
    }

}
