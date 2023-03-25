import { ethers } from "hardhat";

const main = async () => {
    const RewardingToken = "0xd679d486aa519FAc153Cc4fC55AA76FDAaec7a7D";
    const StakingToken = "0x0EaEA708313028a303775f7cEa9b8689C2F153DD"
  const [deployer] = await ethers.getSigners();
  const Factory = await ethers.getContractFactory("Staking");
  const staking = await Factory.deploy(StakingToken, RewardingToken);
  await staking.deployed();

  console.log(`Contract successfully deployed with address: ${staking.address}`)

};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
