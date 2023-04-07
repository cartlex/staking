import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.17",
        settings: {
            optimizer: {
              enabled: true,
              runs: 200
            }
        }
    },
    networks: {
        // hardhat: {
        //     chainId: 1337
        // },
        // optimismgoerli: {
        //     url: `https://opt-goerli.g.alchemy.com/v2/${process.env.OPTIMISM_API_KEY}`,
        //     accounts: [`0x${process.env.PRIVATE_KEY}`]
        // },
        // mumbai: {
        //     url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_API_KEY}`,
        //     accounts: [`0x${process.env.PRIVATE_KEY}`]
        // },

        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_API_KEY}`,
            accounts: [`${process.env.PRIVATE_KEY}`]
        }
    },
    etherscan: {
        apiKey: process.env.SEPOLIA_API_VERIFY // for verification
    },
};

export default config;