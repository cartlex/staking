import walletProvider from "../../abi/walletProvider";

export const changeNetwork = async (networkName) => {
  try {
    await walletProvider.send("wallet_switchEthereumChain", [
      { chainId: networkName.chainId },
    ]);
  } catch (error) {
    if (error.code === 32602) {
      try {
        await walletProvider.send("wallet_addEthereumChain", [
          { chainId: networkName.chainId },
        ]);
      } catch (addError) {
        console.log("add chain to metamask");
      }
    }
  }
};
