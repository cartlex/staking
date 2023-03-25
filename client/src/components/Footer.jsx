const Footer = () => {
  return (
    <div className="flex justify-center items-center mt-[300px] h-[40px]">
      <button className="bg-cyan-600 rounded-[10px] w-[175px] h-[35px]  hover:bg-cyan-500 hover:border-[1px] hover:border-cyan-400 hover:text-white">
        <a
          className="flex justify-center items-center text-[14px] text-gray-200 "
          href="https://github.com/cartlex"
        >
          github: @cartlex
        </a>
      </button>
    </div>
  );
};

export default Footer;
