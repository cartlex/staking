import { BrowserProvider } from "ethers";

if (!window.ethereum) throw new Error("No metamask in this browser. Please install it.");

let walletProvider;
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  walletProvider = new BrowserProvider(window.ethereum);
}

export default walletProvider;
