import walletProvider from "./walletProvider";

const providerWithSigner = async () => {
  return await walletProvider.getSigner();
};

export default providerWithSigner;
