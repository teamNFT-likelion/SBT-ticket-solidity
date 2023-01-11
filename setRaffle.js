require("dotenv").config();
const hostData = require("./hostData/20230110_deployedHostInfo.json");
const ethers = require("ethers");

const { PK, ALCHEMY_KEY, GOERLI_NETWORK_URL, MUMBAI_NETWORK_URL, POLYGON_SCAN_KEY, MUMBAI_NETWORK_INFURA_URL } = process.env;
const RaffleContractAddr = "0x5f9Bf7fd91c037F52E6BD89d1e59697770211492";
const ABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_addr",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [],
		name: "Main",
		outputs: [
			{
				internalType: "contract ttot_main",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_code",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "_tokenId",
				type: "uint256",
			},
		],
		name: "checkWhiteList",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_code",
				type: "string",
			},
		],
		name: "draw",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_code",
				type: "string",
			},
		],
		name: "getRaffleDescription",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_code",
				type: "string",
			},
		],
		name: "getRaffleEndDate",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_code",
				type: "string",
			},
		],
		name: "getRaffleInputList",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_code",
				type: "string",
			},
		],
		name: "getRaffleNumsOfPick",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_code",
				type: "string",
			},
		],
		name: "getRaffleOutputList",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_code",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "_tokenId",
				type: "uint256",
			},
		],
		name: "join",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_code",
				type: "string",
			},
			{
				internalType: "string",
				name: "_desc",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "_endDate",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_numsOfPick",
				type: "uint256",
			},
			{
				internalType: "address[]",
				name: "_whiteList",
				type: "address[]",
			},
		],
		name: "setRaffle",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_code",
				type: "string",
			},
			{
				internalType: "string",
				name: "_baseTokenUri",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "_deadline",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "_hostAddress",
				type: "address",
			},
		],
		name: "setRaffleStart",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];

const provider = new ethers.providers.AlchemyProvider((network = "maticmum"), ALCHEMY_KEY);
const signer = new ethers.Wallet(PK, provider);
const contract = new ethers.Contract(RaffleContractAddr, ABI, signer);

// console.log(contract.functions);

// const hostAddrList = hostData.map((el) => el.id);
// console.log(hostAddrList);
// console.log(hostAddrList.length);

async function set() {
	const result = [];
	// await contract.draw("test1", { gasPrice: 21000000000, gasLimit: 130000 }).then((res) => result.push(res));
	await contract
		.setRaffle(
			"A1DMKBNZI55",
			"web3 monkey concert grand opening",
			1677769200,
			7,
			[
				"0xA4C40d1568E1a4a94B0b4E9b787190bF529934d3",
				"0xa2e8166DC2341457779E82A1677362A9fd4a9b79",
				"0x909304Ea4C5eF2696e581B24a112BFa0672b7dF4",
				"0x34684e61e4C5dd15dc0aAB63F50e2dCf6E76F4Fb",
				"0x8c48ADb5Ee88Da5a8f58289411DCD21Bc478eDEC",
			],
			{
				gasPrice: 21000000000,
				gasLimit: 310000,
			}
		)
		.then((res) => result.push(res));

	await contract
		.setRaffleStart(
			"A1DMKBNZI55", // 코드
			"https://ipfs.io/ipfs/QmQEZRQEFkXh9VEF9guEEFNoaYSxsgm25wZKuZa2qhCC7A/", // base-uri
			1677869200, // end-date 민팅된토큰의
			"0x0000000000000000000000000000000000000000", // 민팅된토큰의 호스트어드레스
			{
				gasPrice: 21000000000,
				gasLimit: 300000,
			}
		)
		.then((res) => result.push(res));

	console.log(result);
}

set();

// const result = [];
// for (let i = 0; i < 4; i++) {
// 	await contract.setHost(hostAddrList[i], { gasPrice: 21000000000, gasLimit: 60000 }).then((res) => result.push(res));
// }

// async function kkk() {
// 	const result = [];
// 	for (let addr of hostAddrList) {
// 		await contract.setHost(addr, { gasPrice: 21000000000, gasLimit: 60000 }).then((res) => result.push(res));
// 	}
// 	console.log(result);
// }
// kkk();
