const hre = require("hardhat");

async function main() {
	// const Raffle = await hre.ethers.getContractFactory("Raffle_ttot");
	// const contract = await Raffle.deploy("0xEe419A049F3eFAdfC961d4a5fF2254F42831f3bD");
	// await contract.deployed();
	// console.log(`address: ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
