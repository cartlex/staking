// SPDX-License-Identifier: MIT
pragma solidity^0.8.0;

interface IERC20 {

    event Transfer(address indexed from, address indexed to, uint value);

    event Approval(address indexed owner, address indexed spender, uint value);

    function name() external view returns(string memory);

    function symbol() external view returns(string memory);

    function decimals() external pure returns(uint8);

    function balanceOf(address account) external view returns (uint);
    
    function transfer(address to, uint amount) external;

    function transferFrom(address owner, address to, uint amount) external;

    function allowance(address owner, address spender) external returns(uint);

    function approve(address spender, uint amount) external;

    function totalSupply() external view returns(uint);
}