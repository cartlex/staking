import { ethers } from "hardhat";

const main = async () => {
  const [deployer] = await ethers.getSigners();
  const Factory = await ethers.getContractFactory("RewardingToken");
  const rewardToken = await Factory.deploy();
  await rewardToken.deployed();

  console.log(`Contract successfully deployed with address: ${rewardToken.address}`)

};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
