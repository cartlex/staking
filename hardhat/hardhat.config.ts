import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// require("dotenv").config();


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
        mumbai: {
            // url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_API_KEY}`,
            url: `https://polygon-mumbai.g.alchemy.com/v2/Au0m0Q4A26dQHCS5HNQpKQVo8TRAIs-a`,
            // accounts: [`0x${process.env.PRIVATE_KEY}`]
            accounts: ["88e0a5baad9638903a0de79b4d995242955fd092dfe14158f8c1f512c103dc2c"]
        },

        // arb_goerli: {
        //     url: `https://arb-goerli.g.alchemy.com/v2/${process.env.ARBITRUM_API_KEY}`,
        //     accounts: [`0x${process.env.PRIVATE_KEY}`]
        // }
    },
    etherscan: {
        // apiKey: process.env.MUMBAI_API_VERIFY // for verification
        apiKey: "QQ8A2NY6T9KWKW44TT2YA4BCC1CHS53CG3" // for verification
    },
};

export default config;