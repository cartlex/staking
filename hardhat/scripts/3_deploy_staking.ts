import { ethers } from "hardhat";

const main = async () => {
  const StakingToken = "0x2885CaDfAa67Bfa3A96961de436B1276A1d36701";
  const RewardingToken = "0x89e20C16469B006Fa06eAFbfcF86B2b619283BE4";

  const [deployer] = await ethers.getSigners();
  const Factory = await ethers.getContractFactory("Staking");
  const staking = await Factory.deploy(StakingToken, RewardingToken);
  await staking.deployed();

  console.log(
    `Contract successfully deployed with address: ${staking.address}`
  );
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
