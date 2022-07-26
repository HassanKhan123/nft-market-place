// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

error NftMarketPlace__PriceMustBeAboveZero();

contract NftMarketPlace is ERC721 {
    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    ) external {
        if (price <= 0) {
            revert NftMarketPlace__PriceMustBeAboveZero();
        }
    }
}
