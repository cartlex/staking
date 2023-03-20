const Network = ({ changeNetwork, networksToChoose }) => {
  return (
    <select
      onChange={changeNetwork}
      className="flex items-center justify-center bg-white outline-none rounded-[10px] text-center placeholder:text-gray-500 text-zinc-700 w-[200px] h-[35px] hover:bg-slate-100 border-[1px] border-cyan-500 m-[5px]"
    >
      {networksToChoose.map((networkToChoose) => (
            <option key={networkToChoose.chainId} value={networkToChoose.chainId}>
                {networkToChoose.chainName}
            </option>
        ))}
    </select>
  );
};

export default Network;
