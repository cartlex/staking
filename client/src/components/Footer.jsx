import { Link } from "react-router-dom";
import { github, telegram, discord } from "../assets";

const Footer = () => {
  return (
    <div className="flex justify-end items-center bg-slate-800 h-[65px] w-full fixed bottom-0 ">
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
