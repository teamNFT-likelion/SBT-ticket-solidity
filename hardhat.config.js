require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const { PK, ETH_SCAN_KEY, GOERLI_NETWORK_URL, MUMBAI_NETWORK_URL, POLYGON_SCAN_KEY, MUMBAI_NETWORK_INFURA_URL } = process.env;
module.exports = {
	solidity: "0.8.7",
	etherscan: {
		apiKey: { goerli: ETH_SCAN_KEY, polygonMumbai: POLYGON_SCAN_KEY },
	},
	networks: {
		goerli: {
			url: GOERLI_NETWORK_URL,
			accounts: [PK],
		},
		polygonMumbai: {
			url: MUMBAI_NETWORK_URL,
			accounts: [PK],
		},
	},
};
