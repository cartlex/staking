// SPDX-License-Identifier: MIT
pragma solidity^0.8.17;

import "./IERC20.sol";

contract ERC20 is IERC20 {
    mapping(address => uint) public _balances;
    mapping(address => mapping(address => uint)) _allowances;

    string public _name;
    string public _symbol;
    uint public _totalSupply;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function name() external view virtual returns(string memory) {
        return _name;
    }

    function symbol() external view virtual returns(string memory) {
        return _symbol;
    }

    function decimals() external pure virtual returns(uint8) {
        return 18;
    }

    function balanceOf(address account) public view returns (uint) {
        return _balances[account];
    }

    function totalSupply() external view virtual returns(uint) {
        return _totalSupply;
    }

    function transfer(address to, uint amount) external virtual {
        _transfer(msg.sender, to, amount);
        emit Transfer(msg.sender, to, amount);
    }

    function allowance(address owner, address spender) public view virtual returns(uint) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint amount) external virtual {
        _approve(msg.sender, spender, amount);

        emit Approval(msg.sender, spender, amount);
    }

    function transferFrom(address from, address to, uint amount) external virtual {
        require(balanceOf(from) >= amount, "not enough token");
        _spendAllowance(from, to, amount);
        _transfer(from, to, amount);
        emit Transfer(from, to, amount);
    }

    function increaseAllowance(address spender, uint addedValue) public virtual {
        _approve(msg.sender, spender, allowance(msg.sender, spender) + addedValue);
    }

    function decreaseAllowance(address spender, uint substractiveValue) public virtual {
        uint currentAllowance = allowance(msg.sender, spender);
        require(currentAllowance >= substractiveValue, "decreased allowance below zero");
        _approve(msg.sender, spender, allowance(msg.sender, spender) - substractiveValue);
    }

    function _transfer(address from, address to, uint amount) internal virtual {
        require(from != address(0), "transfer from zero address");
        require(to != address(0), "transfer to zero address");

        _beforeTokenTransfer(from, to, amount);

        uint fromBalance = _balances[from];
        require(fromBalance >= amount, "transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - amount;
            _balances[to] += amount;
        }
        emit Transfer(from, to, amount);
        _afterTokenTransfer(from, to, amount);
    }

    function _mint(address account, uint amount) public virtual {
        require(account != address(0), "mint to address zero");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply += amount;

        unchecked {
            _balances[account] += amount;
        }
        emit Transfer(address(0), account, amount);
        _afterTokenTransfer(address(0), account, amount);
    }

    function _burn(address account, uint amount) public virtual {
        require(account != address(0), "burn from address zero");
        _beforeTokenTransfer(account, address(0), amount);
        uint accountBalance = _balances[account];
        require(accountBalance >= amount, "burn amount exceeds balance");
        unchecked {
            _balances[account] -= amount;
            _totalSupply -= amount;
        }
        emit Transfer(account, address(0), amount);
        _afterTokenTransfer(account, address(0), amount);
    }

    function _approve(address owner, address spender, uint amount) internal virtual {
        require(owner != address(0), "approve from zero address");
        require(spender != address(0), "approve to zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _spendAllowance(address owner, address spender, uint amount) internal virtual {
        uint currentAllowance = allowance(owner, spender);
        if(currentAllowance != type(uint).max) {
            require(currentAllowance >= amount, "insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    function _beforeTokenTransfer(address from, address to, uint amount) internal virtual {}
    
    function _afterTokenTransfer(address from, address to, uint amount) internal virtual {}
}