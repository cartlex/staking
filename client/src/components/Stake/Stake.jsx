import { formatEther } from "ethers";
import { useContext, useEffect, useState } from "react";
import getStakingWithSigner from "../../abi/Staking/getStakingWithSigner";
import { stakingAddress } from "../../abi/Staking/Staking";
import getStakingTokenWithSigner from "../../abi/StakingToken/getStakingTokenWithSigner";
import { AppContext } from "../../context";
import StakeWindow from "./StakeWindow";
import WithdrawWindow from "./WithdrawWindow";

const Stake = () => {
  const [variant, setVariant] = useState("stake");
  const [amountToStake, setAmountToStake] = useState();
  const [amountToWithdraw, setAmountToWithdraw] = useState();
  const [stakedFunds, setStakedFunds] = useState(null);
  const [tokenName, setTokenName] = useState(null);
  const [earnedFunds, setEarnedFunds] = useState(null);
  const [getReward, setGetReward] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const { isLoading, setIsLoading, address } = useContext(AppContext);
  const [allowanceAmount, setAllowanceAmount] = useState(null);
  const [amountAPR, setAmountAPR] = useState(null);
  const [timeToLock, setTimeToLock] = useState(null);
  const [rewardsPaidToUser, setRewardsPaidToUser] = useState(null);

  const handleStakeSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const stakingTokenContract = await getStakingTokenWithSigner();
      const stakingContract = await getStakingWithSigner();
      const allowance = await stakingTokenContract.allowance(address, stakingAddress);
      setAllowanceAmount(Number(allowance));
      console.log(allowance);
      if (allowance >= amountToStake) {
        const stakeTx = await stakingContract.stake(amountToStake);
        await stakeTx.wait();
      } else {
        const txApprove = await stakingTokenContract.approve(
          stakingAddress,
          amountToStake
        );
        await txApprove.wait();
        const stakeTx = await stakingContract.stake(amountToStake);
        await stakeTx.wait();
      }

      console.log("success");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setAmountToWithdraw("");
      setAmountToStake("");
      console.log(amountToStake);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const stakingContract = await getStakingWithSigner();
        const stakingTokenContract = await getStakingTokenWithSigner();

        const stakedFunds = await stakingContract.balances(address);
        setStakedFunds(Number(formatEther(stakedFunds)));

        const tokenName = await stakingTokenContract.name();
        setTokenName(tokenName);

        const APR = await stakingContract.APR();
        setAmountAPR(Number(APR));

        const periodToLock = await stakingContract.lockPeriod();
        setTimeToLock(Number(periodToLock));
        
        const reward = await stakingContract.rewardsPaid(address);
        setRewardsPaidToUser(Number(formatEther(reward)));

        const balance = await stakingTokenContract.balanceOf(address);
        setUserBalance(Number(formatEther(balance)));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [stakedFunds, earnedFunds, tokenName, userBalance]);

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const stakingContract = await getStakingWithSigner();
      const unstakeTx = await stakingContract.unstake(amountToWithdraw);
      // parseEther("");
      // передеплоить stakingapp, убрать amount из unstake
      await unstakeTx.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setAmountToWithdraw("");
      setAmountToStake("");
    }
  };

  const handleGetRewardSubmit = async () => {
    try {
      setIsLoading(true);
      const stakingContract = await getStakingWithSigner();
      const getRewardToUser = await stakingContract.getReward();
      await getRewardToUser.wait();
      setGetReward(Number(getRewardToUser));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setAmountToWithdraw("");
      setAmountToStake("");
    }
  };

  return (
    <div className="flex flex-col justify-between items-center bg-black bg-opacity-40 w-[500px] h-[400px] rounded-[10px] relative ">
      <div className="flex flex-row justify-start items-center w-[400px] mt-[10px] space-x-2">
        <button
          disabled={isLoading}
          onClick={() => setVariant("stake")}
          className={`cursor-pointer text-zinc-300 rounded-[5px] px-[5px] hover:placeholder:text-slate-200 hover:text-white disabled:bg-black disabled:bg-opacity-50 disabled:border-none ${
            variant === "stake" ? "bg-black bg-opacity-50" : ""
          }`}
        >
          Stake
        </button>
        <button
          disabled={isLoading}
          onClick={() => setVariant("unstake")}
          className={`cursor-pointer text-zinc-300 rounded-[5px] px-[5px] hover:placeholder:text-slate-200 hover:text-white disabled:bg-black disabled:bg-opacity-50 disabled:border-none ${
            variant === "unstake" ? "bg-black bg-opacity-50 " : ""
          }`}
        >
          Unstake
        </button>
      </div>
      {variant === "stake" ? (
        <StakeWindow
          isLoading={isLoading}
          handleStakeSubmit={handleStakeSubmit}
          setAmountToStake={setAmountToStake}
          amountToStake={amountToStake}
          userBalance={userBalance}
          tokenName={tokenName}
        />
      ) : (
        <WithdrawWindow
          isLoading={isLoading}
          handleWithdrawSubmit={handleWithdrawSubmit}
          setAmountToWithdraw={setAmountToWithdraw}
          amountToWithdraw={amountToWithdraw}
          stakedFunds={stakedFunds}
          tokenName={tokenName}
          rewardsPaidToUser={rewardsPaidToUser}
          amountAPR={amountAPR}
          timeToLock={timeToLock}
          handleGetRewardSubmit={handleGetRewardSubmit}
        />
      )}
    </div>
  );
};

export default Stake;
