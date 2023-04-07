import { ethers } from "hardhat";

const main = async () => {
  const StakingToken = "0x093f91Db1f0F08A892D91f442a6879CEdE5AD1db";
  const RewardingToken = "0xD102d6f8ee2B19FEB5ff65D56cDb1Fda71f9D39B";

  const [deployer] = await ethers.getSigners();
  const Factory = await ethers.getContractFactory("StakingApp");
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
