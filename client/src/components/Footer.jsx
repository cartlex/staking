import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <div className="flex justify-start items-center bg-slate-800 h-[50px] w-full fixed bottom-0">
      <Link to="https://github.com/cartlex" className="flex justify-center items-center bg-slate-600 rounded-[10px] w-[175px] h-[35px] ml-[20px]  hover:bg-slate-700 hover:border-[1px] hover:text-white border-slate-900 border-[1px]">
        <button className="flex justify-center items-center text-[14px] text-gray-200">
          github: @cartlex
        </button>
      </Link>
      <Link to="https://telegram.com/cartlex" className="flex justify-center items-center bg-slate-600 rounded-[10px] w-[175px] h-[35px] ml-[20px]  hover:bg-slate-700 hover:border-[1px] hover:text-white border-slate-900 border-[1px]">
        <button className="flex justify-center items-center text-[14px] text-gray-200">
          telegram
        </button>
      </Link>
    </div>
  );
};

export default Footer;
