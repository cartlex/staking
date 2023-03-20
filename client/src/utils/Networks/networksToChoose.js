import { eth, polygonMatic } from "../../assets";


export const networksToChoose = [
  {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    image: polygonMatic,
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  {
    chainId: `0x${Number(5).toString(16)}`,
    chainName: "Goerli",
    image: eth,
    nativeCurrency: {
      name: "Goerli Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://goerli.infura.io/v3/"],
    blockExplorerUrls: ["https://goerli.etherscan.io/"],
  },
  {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      "https://matic-mumbai.chainstacklabs.com",
      "https://rpc-mumbai.maticvigil.com",
      "https://matic-testnet-archive-rpc.bwarelabs.com",
    ],
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },
  {
    chainId: `0x${Number(10).toString(16)}`,
    chainName: "Optimism",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [
        "https://mainnet.optimism.io/",
    ],
    blockExplorerUrls: ["https://optimistic.etherscan.io"],
  },
];
