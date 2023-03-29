const Button = ({ name }) => {
  return (
    <div
      className={`flex justify-center items-center w-[100px]  text-zinc-600 hover:text-zinc-200 my-[3px] mr-[25px] text-[17px] cursor-pointer outline-none rounded-[10px] text-center current h-[27px] hover:bg-opacity-80`}
    >
      {name}
    </div>
  );
};

export default Button;
