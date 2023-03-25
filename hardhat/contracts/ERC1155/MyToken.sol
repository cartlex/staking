// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC1155.sol";
import "./ERC1155Burnable.sol";
import "./Pausable.sol";
import "./ERC1155Supply.sol";

contract MyToken is ERC1155, ERC1155Burnable, Pausable, ERC1155Supply {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "you are not an owner");
        _;
    }

    constructor() ERC1155("http://example.com") {
        owner = msg.sender;
    }

    function setURI(string memory newURI) public onlyOwner {
        _setURI(newURI);
    }

    function mint(
        address account,
        uint id,
        uint amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint[] memory ids,
        uint[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
    
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint[] memory ids,
        uint[] memory amounts,
        bytes memory data
    ) internal whenNotPaused override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}

