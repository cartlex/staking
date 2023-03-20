import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import type { MusicShop } from "../typechain-types";

describe("MusicShop", function () {
  let deployer;
  let user;
  let musicShop: MusicShop;
  let musicShopAsUser: MusicShop;
  const addAlbum = async () => {
    const tx = await musicShop.addAlbum("1", "Quest For Fire", 1000, 1);
    await tx.wait();
  };

  const deploy = async () => {
    [deployer, user] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("MusicShop");
    musicShop = await Factory.deploy();
    musicShopAsUser = musicShop.connect(user);

    return { deployer, user, musicShop, musicShopAsUser };
  };

  it("sets owner", async function () {
    const { deployer, musicShop } = await loadFixture(deploy);

    expect(await musicShop.owner()).to.eq(deployer.address);
  });

  describe("addAlbum()", async () => {
    it("allows owner to add album", async function () {
      const { deployer, musicShop } = await loadFixture(deploy);
      await addAlbum();

      const newAlbum = await musicShop.albums(0);

      expect(newAlbum.uid).to.eq("1");
      expect(newAlbum.title).to.eq("Quest For Fire");
      expect(newAlbum.price).to.eq(1000);
      expect(newAlbum.quantity).to.eq(1);

      expect(await musicShop.currentIndex()).to.eq(1);
    });

    it("shouldn't allow user to add album", async function () {
      const { user, musicShop } = await loadFixture(deploy);
      const addFromUser = musicShop.connect(user);
      await expect(
        addFromUser.addAlbum("1", "Quest For Fire", 1000, 1)
      ).to.be.revertedWith("not an owner");
    });
  });

  describe("buy", async () => {
    it("allows to buy album", async () => {
      const { user, musicShop } = await loadFixture(deploy);
      await addAlbum();

      const tx = await musicShopAsUser.buy(0, { value: 1000 });
      await tx.wait();

      const album = await musicShop.albums(0);

      expect(album.quantity).to.eq(0);

      const order = await musicShop.orders(0);

      expect(order.albumUid).to.eq(album.uid);
      expect(order.customer).to.eq(user.address);
      expect(order.status).to.eq(0);
      const ts = (await ethers.provider.getBlock(<number>tx.blockNumber))
        .timestamp;
      expect(order.orderedAt).to.eq(ts);

      await expect(tx)
        .to.emit(musicShopAsUser, "AlbumBought")
        .withArgs(order.albumUid, user.address, ts);

      await expect(tx).to.changeEtherBalance(musicShopAsUser, 1000);
    });

    it("it should revert if value is not equal to album price", async () => {
      const { musicShopAsUser } = await loadFixture(deploy);
      await addAlbum();

      await expect(musicShopAsUser.buy(0, { value: 1100 })).to.be.revertedWith(
        "invalid value"
      );
    });

    it("it should revert if quantity is zero", async () => {
      const { musicShop, musicShopAsUser } = await loadFixture(deploy);

      const index = await musicShop.currentIndex();
      await addAlbum();

      const tx = await musicShopAsUser.buy(index, { value: 1000 });
      await tx.wait();
      
      const album = await musicShop.albums(index);

      await expect(
        musicShopAsUser.buy(album.index, { value: 1000 })
      ).to.be.revertedWith("out of stock");
    });
  });

  describe("delivered()", async () => {
    it("owner can change status to delivered", async () => {
      const { musicShop, musicShopAsUser } = await loadFixture(deploy);
      await addAlbum();

      const album = await musicShop.albums(0);

      const tx = await musicShopAsUser.buy(album.index, { value: 1000 });
      await tx.wait();

      const tx2 = await musicShop.delivered(album.index);
      await tx2.wait();

      const order = await musicShop.orders(album.index);
      expect(order.status).to.eq(1);
    });

    it("should revert when user try to change status to delivered", async () => {
      const { musicShop, musicShopAsUser } = await loadFixture(deploy);
      await addAlbum();
      const album = await musicShop.albums(0);

      const tx = await musicShopAsUser.buy(album.index, { value: 1000 });
      await tx.wait();

      await expect(musicShopAsUser.delivered(album.index)).to.be.revertedWith(
        "not an owner"
      );
    });

    it("should revert when order status is delivered", async () => {
      const { musicShop, musicShopAsUser } = await loadFixture(deploy);
      await addAlbum();

      const album = await musicShop.albums(0);

      const tx = await musicShopAsUser.buy(album.index, { value: 1000 });
      await tx.wait();

      const tx2 = await musicShop.delivered(album.index);
      await tx2.wait();

      await expect(musicShop.delivered(album.index)).to.be.revertedWith(
        "invalid status"
      );
    });

    it("should emit an event OrderDelivered", async () => {
      const { musicShop, musicShopAsUser } = await loadFixture(deploy);
      await addAlbum();

      const album = await musicShop.albums(0);

      const tx = await musicShopAsUser.buy(album.index, { value: 1000 });
      await tx.wait();

      const order = await musicShop.orders(album.index);

      await expect(musicShop.delivered(album.index))
        .to.emit(musicShop, "OrderDelivered")
        .withArgs(order.albumUid, order.customer);
    });
  });

  describe("receive()", async()=> {
    it("doesn't accept funds via receive", async () => {
      const { deployer } = await loadFixture(deploy);

        const txData = {
            value: 1000,
            to: musicShop.address
        }

        await expect(deployer.sendTransaction(txData)).to.be.revertedWith("Please use the buy function to purchase albums!");
    })
  })

//   describe("allAlbums()", async () => {
//     it("should show all albums", async () => {
//         const { musicShop } = await loadFixture(deploy);
//         await addAlbum();
//         const index = await musicShop.currentIndex();
//         const album = await musicShop.albums(index);
//     })
//   })
});
