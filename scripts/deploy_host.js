const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
const hostData = require("../hostData/hostInfo_copy_1.json");

const mainCA = "0xd54bbe64512960Dc409A9532108F6Cf3E15DFe2B"; //20230110

async function main() {
	const deployedItems = await Promise.all(
		hostData.map(async (item) => {
			const host = await hre.ethers.getContractFactory("ttot_host");
			const hostCA = await host.deploy(mainCA, item.cast);
			await hostCA.deployed();
			console.log(item.cast, "HostAddress", hostCA.address);
			return { id: hostCA.address, ...item };
		})
	);

	const outPath = path.join(__dirname, "../hostData");
	fs.unlinkSync(`${outPath}/deployedHostInfo_copy_1.json`);
	fs.writeFileSync(`${outPath}/deployedHostInfo_copy_1.json`, JSON.stringify(deployedItems, null, 2), { encoding: "utf8", flag: "w" });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
