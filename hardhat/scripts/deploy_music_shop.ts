import { ethers } from "hardhat";

const main = async() => {
    const [deployer] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("MusicShop");
    const MusicShop = await Factory.deploy()
    await MusicShop.deployed();
    console.log(`Contract successfully deployed with address: ${MusicShop.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
