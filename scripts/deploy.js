const hre = require("hardhat");

async function main() {
	const main = await hre.ethers.getContractFactory("ttot_main");
	const mainCA = await main.deploy();

	await mainCA.deployed();

	const raffle = await hre.ethers.getContractFactory("Raffle_ttot");
	const raffleCA = await raffle.deploy(mainCA.address);

	await raffleCA.deployed();

	console.log(`main address: ${mainCA.address}`);
	console.log(`raffle address: ${raffleCA.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
