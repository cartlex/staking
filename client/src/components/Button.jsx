const Button = ({ name }) => {
  return (
    <div
      className={`flex justify-center items-center w-[100px] hover:bg-slate-100 my-[3px] mr-[25px] text-[14px] cursor-pointer bg-white outline-none rounded-[10px] text-center placeholder:text-gray-500 text-zinc-700 h-[27px]`}
    >
      {name}
    </div>
  );
};

export default Button;
