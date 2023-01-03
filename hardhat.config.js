require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const { PK, ETH_SCAN_KEY, GOERLI_NETWORK_URL, MUMBAI_NETWORK_URL } = process.env;
module.exports = {
	solidity: "0.8.0",
	etherscan: {
		apiKey: ETH_SCAN_KEY,
	},
	networks: {
		goerli: {
			url: GOERLI_NETWORK_URL,
			accounts: [PK],
		},
		polygon_mumbai: {
			url: MUMBAI_NETWORK_URL,
			accounts: [PK],
		},
	},
};
