import { eth, polygonMatic, optimism } from "../../assets";

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
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    image: eth,
    nativeCurrency: {
      name: "Sepolia Ether",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://eth-sepolia.g.alchemy.com/v2/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io/"],
  },
  {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Mumbai",
    image: polygonMatic,
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
    image: optimism,
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
