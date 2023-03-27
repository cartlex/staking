import walletProvider from "../walletProvider";
import rewardToken from "./rewardToken";

const getRewadTokenWithSigner = async() => {
    const signer = await walletProvider.getSigner();
    return rewardToken.connect(signer);
}

export default getRewadTokenWithSigner;