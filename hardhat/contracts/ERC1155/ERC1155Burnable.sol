// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC1155.sol";

abstract contract ERC1155Burnable is ERC1155 {
    function burn(
        address account,
        uint id,
        uint amount
    ) public virtual {
        require(
            account == msg.sender ||
            isApprovedForAll(account, msg.sender)
        );

        _burn(account, id, amount);
    }

    function burnBatch(
        address account,
        uint[] memory ids,
        uint[] memory amounts
    ) public virtual {
        require(
            account == msg.sender ||
            isApprovedForAll(account, msg.sender)
        );

        _burnBatch(account, ids, amounts);
    }
}