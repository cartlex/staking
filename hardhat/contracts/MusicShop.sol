// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MusicShop {
    struct Album {
        uint index;
        string uid;
        string title;
        uint price;
        uint quantity;
    }

    struct Order {
        string albumUid;
        address customer;
        uint orderedAt;
        OrderStatus status;
    }

    enum OrderStatus { Paid, Delivered }

    Album[] public albums;
    Order[] public orders;

    uint public currentIndex;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    event AlbumBought(string indexed uid, address indexed customer, uint indexed timestamp);
    event OrderDelivered(string indexed albumUid, address customer);

    modifier onlyOwner() {
        require(msg.sender == owner, "not an owner");
        _;
    }

    function addAlbum(
        string calldata uid,
        string calldata title,
        uint price,
        uint quantity
    ) external onlyOwner {
        albums.push(Album({
            index: currentIndex,
            uid: uid,
            title: title,
            price: price,
            quantity: quantity
        }));

        currentIndex++;
    }

    function buy(uint _index) external payable {
        Album storage albumToBuy = albums[_index];
        require(msg.value == albumToBuy.price, "invalid value");
        require(albumToBuy.quantity > 0, "out of stock");

        albumToBuy.quantity--;
        orders.push(Order({
            albumUid: albumToBuy.uid,
            customer: msg.sender,
            orderedAt: block.timestamp,
            status: OrderStatus.Paid
        }));

        emit AlbumBought(albumToBuy.uid, msg.sender, block.timestamp);
    }

    function delivered(uint _index) external onlyOwner {
        Order storage currentOrder = orders[_index];
        require(currentOrder.status != OrderStatus.Delivered, "invalid status");
        currentOrder.status = OrderStatus.Delivered;

        emit OrderDelivered(currentOrder.albumUid, currentOrder.customer);
    }
    
    function allAlbums() external view returns(Album[] memory) {
        Album[] memory albumsList = new Album[](albums.length);

        for (uint i = 0; i < albums.length; i++) {
            albumsList[i] = albums[i];
        }

        return albumsList;
    }

    receive() external payable {
        revert("Please use the buy function to purchase albums!");
    }
}
