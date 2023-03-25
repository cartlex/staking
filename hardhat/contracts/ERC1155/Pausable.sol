// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract Pausable {
    bool private _paused;

    event Paused(address account);
    event Unpaused(address account);

    modifier whenNotPaused() {
        _requireNotPaused();
        _;
    }

    modifier whenPaused() {
        _requireNotPaused();
        _;
    }

    constructor() {
        _paused = false;
    }

    function paused() public view virtual returns(bool) {
        return _paused;
    }

    function _requireNotPaused() internal view virtual {
        require(!paused());
    }

    function _requirePaused() internal view virtual {
        require(paused());
    }

    function _pause() internal virtual whenNotPaused {
        _paused = true;
        emit Paused(msg.sender);
    }

    function _unpause() internal virtual whenPaused {
        _paused = false;
        emit Unpaused(msg.sender);
    }
}