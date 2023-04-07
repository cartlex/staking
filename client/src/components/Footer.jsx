import { Link } from "react-router-dom";
import { github, telegram, discord } from "../assets";
import { stakingAddress } from "../abi/Staking/Staking";

const Footer = () => {
  return (
    <div className="flex justify-between items-center bg-slate-800 h-[65px] w-full fixed bottom-0 ">
      <div className="flex flex-row space-x-[20px]">
        <h1 className="ml-[30px] text-zinc-300">All rights reserved (c)</h1>
        <Link
          target="_blank"
          to="https://sepolia.etherscan.io/address/0xC5f9701e6EEA392A8457d140Ce385B9866617372#code"
          className="flex justify-center items-center"
        >
          <h1 className="ml-[30px] text-zinc-300">
            Etherscan: {stakingAddress}
          </h1>
        </Link>
      </div>

      <div className="flex flex-row mr-[30px] space-x-[15px]">
        <Link
          target="_blank"
          to="https://github.com/cartlex"
          className="flex justify-center items-center"
        >
          <img src={github} className="w-[35px] h-[35px]" />
          {/* <button className="flex justify-center items-center text-[14px] text-gray-200">
          github: @cartlex
        </button> */}
        </Link>
        <Link
          target="_blank"
          to="https://telegram.com/cartlex"
          className="flex justify-center items-center"
        >
          <img src={telegram} className="w-[35px] h-[35px]" />
        </Link>
        <Link
          target="_blank"
          to="t.me/cartlex"
          className="flex justify-center items-center"
        >
          <img src={discord} className="w-[35px] h-[35px]" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
