require("dotenv").config();
const hostData = require("./hostData/20230110_deployedHostInfo.json");
const ethers = require("ethers");

const { PK, ALCHEMY_KEY, GOERLI_NETWORK_URL, MUMBAI_NETWORK_URL, POLYGON_SCAN_KEY, MUMBAI_NETWORK_INFURA_URL } = process.env;

const ABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_mainContractAddress",
				type: "address",
			},
			{
				internalType: "string",
				name: "_hostName",
				type: "string",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_date",
				type: "uint256",
			},
		],
		name: "getSeats",
		outputs: [
			{
				internalType: "string[]",
				name: "",
				type: "string[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "mainContract",
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
				internalType: "uint256",
				name: "_date",
				type: "uint256",
			},
			{
				internalType: "string[]",
				name: "_seats",
				type: "string[]",
			},
		],
		name: "popSeat",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_date",
				type: "uint256",
			},
			{
				internalType: "string[]",
				name: "_seats",
				type: "string[]",
			},
		],
		name: "pushSeat",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_date",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_limit",
				type: "uint256",
			},
		],
		name: "setDateAndLimit",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
const provider = new ethers.providers.AlchemyProvider((network = "maticmum"), ALCHEMY_KEY);
const signer = new ethers.Wallet(PK, provider);

const target1 = hostData.filter((el) => el.topic === "전시");
// const target2 = hostData.filter((el) => el.topic === "스포츠");
// const target3 = hostData.filter((el) => el.topic === "공연" && el.cast !== "펭수");

// console.log(target3);

async function kkk() {
	const result = [];
	for (let host of target1) {
		const ContractAddr = host.id;
		const contract = new ethers.Contract(ContractAddr, ABI, signer);
		const dates = Object.keys(host.dateInfo);

		const times = [];
		for (let date of dates) {
			for (let round of host.dateInfo[date]) {
				times.push(round.startTime / 1000); // 천 나눠야하넹
			}
		}

		for (let time of times) {
			// console.log(time, host.cast, 81);
			await contract.setDateAndLimit(time, 81, { gasPrice: 21000000000, gasLimit: 60000 }).then((res) => result.push({ res, host: host.cast }));
		}
	}
	console.log(result, result.length);
}

kkk();

// async function set() {
// 	const a = await contract.setDateAndLimit(167380000, 81, { gasPrice: 21000000000, gasLimit: 60000 });
// 	console.log(a);
// }

// set();

// async function kkk() {
// 	const result = [];
// 	for (let addr of hostAddrList) {
// 		await contract.setHost(addr, { gasPrice: 21000000000, gasLimit: 60000 }).then((res) => result.push(res));
// 	}
// 	console.log(result);
// }
// kkk();
