import { networksToChoose } from "./networksToChoose";

export const changeNetwork = async (networkName) => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          ...networksToChoose[networkName],
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
};
