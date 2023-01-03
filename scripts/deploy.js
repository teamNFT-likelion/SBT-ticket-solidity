const hre = require("hardhat");

async function main() {
	const Raffle = await hre.ethers.getContractFactory("Raffle_ttot");
	const contract = await Raffle.deploy();

	await contract.deployed();

	console.log(`address: ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
