const hre = require("hardhat");

const mainCA = "0xd54bbe64512960Dc409A9532108F6Cf3E15DFe2B"; //20230110

async function main() {
	const cast = "펭수";
	const host = await hre.ethers.getContractFactory("ttot_host");
	const hostCA = await host.deploy(mainCA, cast);
	await hostCA.deployed();
	console.log(cast, "HostAddress", hostCA.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
