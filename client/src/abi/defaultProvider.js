import { AlchemyProvider, InfuraProvider } from "ethers";

const defaultProvier = new AlchemyProvider(process.env.mumbaiNetwork);

export default defaultProvier;