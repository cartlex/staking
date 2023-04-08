// SPDX-License-Identifier: MIT
pragma solidity^0.8.17;

import "./StakingToken.sol";
import "./RewardingToken.sol";

/// @title Contract for staking ERC20 tokens
/// @author cartlex
contract StakingApp {
    error NotEnough();
    error AlreadyClaimed();
    error AlreadyStaked();
    error NotTime();
    error ZeroAddress();
    
    uint public constant APR = 4; 
    uint public constant MINIMUM_STAKE = 10 ** 18;
    uint public constant SECOND_IN_ONE_YEAR = 31536000;
    address public owner;
    StakingToken public ST;
    RewardingToken public RW;
    
    uint public lockPeriod = 60 seconds;
    uint public totalStakedTokenAmount;

    struct Staker {
        uint amount;
        uint startTimestamp;
        uint endTimestamp;
        address sender;
        bool staked;
    }

    mapping(address => uint) public balances;
    mapping(address => uint) public rewardsPaid;
    mapping(address => Staker) public Stakers;

    event Staked(address indexed sender, uint indexed amount);
    event Unstake(address indexed sender, uint indexed amount);
    event EtherReceived(address indexed sender, uint indexed amount);

    modifier unlocked() {
        Staker memory staker = Stakers[msg.sender];
        if(block.timestamp < Stakers[msg.sender].endTimestamp) {
            revert NotTime();
        }
        _;
    }

    constructor(address _ST, address _RW) {
        if(_ST == address(0)) revert ZeroAddress();
        if(_RW == address(0)) revert ZeroAddress();

        owner = msg.sender;
        ST = StakingToken(_ST);
        RW = RewardingToken(_RW);
    }

    receive() external payable {
        emit EtherReceived(msg.sender, msg.value);
    }

    function stake(uint _amount) external {
        Staker memory staker = Stakers[msg.sender];

        if(_amount < MINIMUM_STAKE) revert NotEnough();
        if(staker.staked == true) revert AlreadyStaked();

        Stakers[msg.sender] = Staker(
            _amount,
            block.timestamp,
            block.timestamp + lockPeriod,
            msg.sender,
            true
        );

        totalStakedTokenAmount += _amount;
        balances[msg.sender] += _amount;
        ST.transferFrom(msg.sender, address(this), _amount);

        emit Staked(msg.sender, _amount);
    }

    function unstake() unlocked external {
        uint amount = balances[msg.sender];
        uint reward = _getRewardAmount();
        delete balances[msg.sender];
        delete Stakers[msg.sender];
        ST.transfer(msg.sender, amount);
        RW.transfer(msg.sender, reward);

        emit Unstake(msg.sender, amount);
    }

    function getReward() external unlocked {
        Stakers[msg.sender].startTimestamp = block.timestamp;
        Stakers[msg.sender].endTimestamp = Stakers[msg.sender].startTimestamp + lockPeriod;
        rewardsPaid[msg.sender] += _getRewardAmount();
        RW.transfer(msg.sender, _getRewardAmount());
    }

    function _getRewardAmount() public view returns (uint) {
        Staker memory staker = Stakers[msg.sender];
        return (((staker.amount * APR) / 100) / SECOND_IN_ONE_YEAR) * (staker.endTimestamp - staker.startTimestamp);
    }
}

