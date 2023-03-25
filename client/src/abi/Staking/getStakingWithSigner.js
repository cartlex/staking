import walletProvider from "../walletProvider"
import staking from "./Staking";

const getStakingWithSigner = async () => {
    const signer = await walletProvider.getSigner();
    return staking.connect(signer);
}

export default getStakingWithSigner;
