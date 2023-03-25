import walletProvider from "../walletProvider";
import stakingToken from "./stakingToken";

const getStakingTokenWithSigner = async () => {
  const signer = await walletProvider.getSigner();
  return stakingToken.connect(signer);
};

export default getStakingTokenWithSigner;

