import { ethers } from "hardhat";

const main = async () => {
  const StakingToken = "0xedE2755842B471672a85A6282f8374FCc1C6956f";
  const RewardingToken = "0x8F58c2eA6E71Ca298230A86e7b62c114b4146953";

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
