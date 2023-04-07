import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import type {
  StakingApp,
  StakingToken,
  RewardingToken,
} from "../typechain-types";

describe("StakingApp", function () {
  let stakingApp: StakingApp;
  let stakingToken: StakingToken;
  let rewardingToken: RewardingToken;
  let MINIMUM_STAKE = ethers.utils.parseEther("1.0");
  let RWSupply = ethers.utils.parseEther("30000000000");
  let lockPeriod = 60;
  let APR = 4;
  let SECOND_IN_ONE_YEAR = 31536000;

  const deployStakingToken = async () => {
    const [stakingTokenDeployer, stakingTokenUser1, stakingTokenUser2] =
      await ethers.getSigners();
    const Factory = await ethers.getContractFactory("StakingToken");
    stakingToken = await Factory.deploy();

    return {
      stakingToken,
      stakingTokenDeployer,
      stakingTokenUser1,
      stakingTokenUser2,
    };
  };

  const deployRewardingToken = async () => {
    const [rewardingTokenDeployer, rewardingTokenUser1, rewardingTokenUser2] =
      await ethers.getSigners();
    const Factory = await ethers.getContractFactory("RewardingToken");
    rewardingToken = await Factory.deploy();

    const RewardingAppAsUser1 = rewardingToken.connect(rewardingTokenUser1);
    const RewardingAppAsUser2 = rewardingToken.connect(rewardingTokenUser2);

    return {
      rewardingToken,
      rewardingTokenDeployer,
      rewardingTokenUser1,
      rewardingTokenUser2,
    };
  };

  const deployStakingApp = async () => {
    const { stakingToken } = await loadFixture(deployStakingToken);
    const { rewardingToken } = await loadFixture(deployRewardingToken);

    const [stakingAppDeployer, user1, user2] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("StakingApp");
    stakingApp = await Factory.deploy(
      stakingToken.address,
      rewardingToken.address
    );

    const stakingAppUser1 = stakingApp.connect(user1);

    return { stakingApp, stakingAppDeployer, stakingAppUser1, user2 };
  };

  describe("deployStakingApp", async () => {
    it("should deploy with proper getters", async () => {
      const { stakingToken } = await loadFixture(deployStakingToken);
      const { rewardingToken } = await loadFixture(deployRewardingToken);
      const { stakingApp, stakingAppDeployer } = await loadFixture(
        deployStakingApp
      );

      expect(await stakingApp.owner()).to.eq(stakingAppDeployer.address);
      expect(await stakingApp.lockPeriod()).to.eq(lockPeriod);
      expect(await stakingApp.APR()).to.eq(APR);
      expect(await stakingApp.MINIMUM_STAKE()).to.eq(MINIMUM_STAKE);
      expect(await stakingApp.SECOND_IN_ONE_YEAR()).to.eq(SECOND_IN_ONE_YEAR);
      expect(await stakingApp.ST()).to.eq(stakingToken.address);
      expect(await stakingApp.RW()).to.eq(rewardingToken.address);
      expect(await stakingApp.totalStakedTokenAmount()).to.eq(0);
    });

    it("should revert if staking token is zero address", async () => {
      const stakingToken = ethers.constants.AddressZero;
      const [stakingAppDeployer] = await ethers.getSigners();
      const Factory = await ethers.getContractFactory("StakingApp");
      await expect(
        Factory.deploy(stakingToken, rewardingToken.address)
      ).to.be.revertedWithCustomError(stakingApp, "ZeroAddress");
    });

    it("should revert if rewarding token is zero address", async () => {
        const rewardingToken = ethers.constants.AddressZero;
        const [stakingAppDeployer] = await ethers.getSigners();
        const Factory = await ethers.getContractFactory("StakingApp");
        await expect(
          Factory.deploy(stakingToken.address, rewardingToken)
        ).to.be.revertedWithCustomError(stakingApp, "ZeroAddress");
      });
  });

  describe("stake()", async () => {
    it("user can stake token", async () => {
      const { stakingToken, stakingTokenDeployer } = await loadFixture(
        deployStakingToken
      );
      const { rewardingToken } = await loadFixture(deployRewardingToken);
      const { stakingApp, stakingAppDeployer } = await loadFixture(
        deployStakingApp
      );

      const transferRWtoStakingContractTx = await rewardingToken.transfer(
        stakingApp.address,
        RWSupply
      );
      await transferRWtoStakingContractTx.wait();

      const approveTx = await stakingToken.approve(
        stakingApp.address,
        MINIMUM_STAKE
      );
      await approveTx.wait();
      expect(
        await stakingToken.allowance(
          stakingTokenDeployer.address,
          stakingApp.address
        )
      ).to.eq(MINIMUM_STAKE);
      expect(await rewardingToken.balanceOf(stakingApp.address)).to.eq(
        RWSupply
      );

      const stakeTx = await stakingApp.stake(MINIMUM_STAKE);
      await stakeTx.wait();

      const Staker = await stakingApp.Stakers(stakingAppDeployer.address);
      const blockTimestamp = (
        await ethers.provider.getBlock(<number>stakeTx.blockNumber)
      ).timestamp;

      expect(await stakingApp.totalStakedTokenAmount()).to.eq(MINIMUM_STAKE);
      expect(await stakingApp.balances(stakingAppDeployer.address)).to.eq(
        MINIMUM_STAKE
      );
      expect(await stakingToken.balanceOf(stakingApp.address)).to.eq(
        MINIMUM_STAKE
      );
      expect(Staker.amount).to.eq(MINIMUM_STAKE);
      expect(Staker.startTimestamp).to.eq(blockTimestamp);
      expect(Staker.endTimestamp).to.eq(blockTimestamp + lockPeriod);
      expect(Staker.sender).to.eq(stakingAppDeployer.address);
      expect(Staker.staked).to.eq(true);
      await expect(stakeTx)
        .to.emit(stakingApp, "Staked")
        .withArgs(stakingAppDeployer.address, MINIMUM_STAKE);
    });

    it("should revert if amount less than minimun stake", async () => {
      const { stakingToken } = await loadFixture(deployStakingToken);
      const { rewardingToken } = await loadFixture(deployRewardingToken);
      const { stakingApp } = await loadFixture(deployStakingApp);

      let MINIMUM_STAKE = ethers.utils.parseEther("0.5");

      const transferRWtoStakingContractTx = await rewardingToken.transfer(
        stakingApp.address,
        RWSupply
      );
      await transferRWtoStakingContractTx.wait();

      const approveTx = await stakingToken.approve(
        stakingApp.address,
        MINIMUM_STAKE
      );
      await approveTx.wait();
      await expect(
        stakingApp.stake(MINIMUM_STAKE)
      ).to.be.revertedWithCustomError(stakingApp, "NotEnough");
    });

    it("should revert if it already staked", async () => {
      const { stakingToken } = await loadFixture(deployStakingToken);
      const { rewardingToken } = await loadFixture(deployRewardingToken);
      const { stakingApp } = await loadFixture(deployStakingApp);

      const transferRWtoStakingContractTx = await rewardingToken.transfer(
        stakingApp.address,
        RWSupply
      );
      await transferRWtoStakingContractTx.wait();

      const approveTx = await stakingToken.approve(
        stakingApp.address,
        MINIMUM_STAKE
      );
      await approveTx.wait();
      const stakeTx = await stakingApp.stake(MINIMUM_STAKE);
      await stakeTx.wait();
      await expect(
        stakingApp.stake(MINIMUM_STAKE)
      ).to.be.revertedWithCustomError(stakingApp, "AlreadyStaked");
    });
  });

  describe("getReward()", async () => {
    it("should allow user to get a reward", async () => {
      const { stakingToken, stakingTokenDeployer } = await loadFixture(
        deployStakingToken
      );
      const { rewardingToken } = await loadFixture(deployRewardingToken);
      const { stakingApp, stakingAppDeployer } = await loadFixture(
        deployStakingApp
      );

      const transferRWtoStakingContractTx = await rewardingToken.transfer(
        stakingApp.address,
        RWSupply
      );
      await transferRWtoStakingContractTx.wait();

      const approveTx = await stakingToken.approve(
        stakingApp.address,
        MINIMUM_STAKE
      );
      await approveTx.wait();

      expect(await rewardingToken.balanceOf(stakingApp.address)).to.eq(
        RWSupply
      );

      const stakeTx = await stakingApp.stake(MINIMUM_STAKE);
      await stakeTx.wait();

      const Staker = await stakingApp.Stakers(stakingAppDeployer.address);
      const amount = Staker.amount;
      const startAt = (await ethers.provider.getBlock("latest")).timestamp;
      await ethers.provider.send("evm_increaseTime", [60]);
      const getRewardTx = await stakingApp.getReward();
      const endAt = (
        await ethers.provider.getBlock(<number>getRewardTx.blockNumber)
      ).timestamp;

      expect(Staker.startTimestamp).to.eq(startAt);
      expect(Staker.endTimestamp).to.eq(endAt);
      const reward =
        Math.trunc((Number(amount) * APR) / 100 / SECOND_IN_ONE_YEAR) *
        (endAt - startAt);
      expect(await stakingApp.rewardsPaid(stakingAppDeployer.address)).to.eq(
        Math.trunc(reward)
      );

      expect(await rewardingToken.balanceOf(stakingAppDeployer.address)).to.eq(
        reward
      );
    });

    it("should revert if it is not a time", async () => {
      const { stakingToken } = await loadFixture(deployStakingToken);
      const { rewardingToken } = await loadFixture(deployRewardingToken);
      const { stakingApp } = await loadFixture(deployStakingApp);

      const transferRWtoStakingContractTx = await rewardingToken.transfer(
        stakingApp.address,
        RWSupply
      );
      await transferRWtoStakingContractTx.wait();

      const approveTx = await stakingToken.approve(
        stakingApp.address,
        MINIMUM_STAKE
      );
      await approveTx.wait();

      const stakeTx = await stakingApp.stake(MINIMUM_STAKE);
      await stakeTx.wait();

      await expect(stakingApp.getReward()).to.be.revertedWithCustomError(
        stakingApp,
        "NotTime"
      );
    });
  });

  describe("receive()", async () => {
    it("should receive money", async () => {
      const { stakingApp, stakingAppDeployer } = await loadFixture(
        deployStakingApp
      );

      const sendAmount = 1000;
      const txData = {
        to: stakingApp.address,
        value: sendAmount,
      };
      const tx = await stakingAppDeployer.sendTransaction(txData);
      await expect(tx).to.changeEtherBalance(stakingApp.address, sendAmount);
    });
  });

  describe("withdraw()", async () => {
    it("allow to withdraw tokens to user", async () => {
      const { stakingToken } = await loadFixture(deployStakingToken);
      const { rewardingToken } = await loadFixture(deployRewardingToken);
      const { stakingApp, stakingAppDeployer } = await loadFixture(
        deployStakingApp
      );

      let amountToUnstake = ethers.utils.parseEther("0.5");

      const transferRWtoStakingContractTx = await rewardingToken.transfer(
        stakingApp.address,
        RWSupply
      );
      await transferRWtoStakingContractTx.wait();

      const approveTx = await stakingToken.approve(
        stakingApp.address,
        MINIMUM_STAKE
      );
      await approveTx.wait();
      // добавить отдельную переменную с разницей между стейком и анстейком
      const stakeTx = await stakingApp.stake(MINIMUM_STAKE);
      await stakeTx.wait();
      await ethers.provider.send("evm_increaseTime", [60]);
      const unstakeTx = await stakingApp.unstake(amountToUnstake);
      await unstakeTx.wait();

      const staker = await stakingApp.Stakers(stakingAppDeployer.address);
      expect(staker.amount).to.eq(amountToUnstake);
      expect(await stakingApp.balances(stakingAppDeployer.address)).to.eq(
        amountToUnstake
      );
      expect(await stakingApp.totalStakedTokenAmount()).to.eq(amountToUnstake);
      await expect(unstakeTx).to.changeTokenBalance(
        stakingToken,
        stakingAppDeployer.address,
        amountToUnstake
      );

      await expect(unstakeTx)
        .to.emit(stakingApp, "Withdrawn")
        .withArgs(stakingAppDeployer.address, amountToUnstake);
    });
  });
});
