// mock-data 생성용 파일입니다. 파일 실행시 푸시된 데이터가 일관된 형식으로 hostData/hostInfo.json 에 생성됩니다.
// 이후 hostInfo.json 은 scripts/deploy_host 파일에 의해 배포시 어드레스값을 아이디로 한 값으로 변환되어 hostData/deployedHostInfo.json 에 저장 됩니다.
const path = require("path");
const fs = require("fs");

const seats = {
	sections: [
		{
			event_id: 2,
			name: "Bronze",
			price: 300,
			subsections: [
				{
					id: 18,
					section_id: 6,
					name: "B1",
					seats_by_rows: {
						1: [
							{
								name: "Bronze-B1-1-1",
								status: "free",
							},
							{
								name: "Bronze-B1-1-2",
								status: "free",
							},
							{
								name: "Bronze-B1-1-3",
								status: "free",
							},
						],
						2: [
							{
								name: "Bronze-B1-2-1",
								status: "free",
							},
							{
								name: "Bronze-B1-2-2",
								status: "free",
							},
							{
								name: "Bronze-B1-2-3",
								status: "free",
							},
						],
						3: [
							{
								name: "Bronze-B1-3-1",
								status: "free",
							},
							{
								name: "Bronze-B1-3-2",
								status: "free",
							},
							{
								name: "Bronze-B1-3-3",
								status: "free",
							},
						],
					},
				},
				{
					id: 19,
					section_id: 6,
					name: "B2",
					seats_by_rows: {
						1: [
							{
								name: "Bronze-B2-1-1",
								status: "free",
							},
							{
								name: "Bronze-B2-1-2",
								status: "free",
							},
							{
								name: "Bronze-B2-1-3",
								status: "free",
							},
						],
						2: [
							{
								name: "Bronze-B2-2-1",
								status: "free",
							},
							{
								name: "Bronze-B2-2-2",
								status: "free",
							},
							{
								name: "Bronze-B2-2-3",
								status: "free",
							},
						],
						3: [
							{
								name: "Bronze-B2-3-1",
								status: "free",
							},
							{
								name: "Bronze-B2-3-2",
								status: "free",
							},
							{
								name: "Bronze-B2-3-3",
								status: "free",
							},
						],
					},
				},
				{
					id: 20,
					section_id: 6,
					name: "B3",
					seats_by_rows: {
						1: [
							{
								name: "Bronze-B3-1-1",
								status: "free",
							},
							{
								name: "Bronze-B3-1-2",
								status: "free",
							},
							{
								name: "Bronze-B3-1-3",
								status: "free",
							},
						],
						2: [
							{
								name: "Bronze-B3-2-1",
								status: "free",
							},
							{
								name: "Bronze-B3-2-2",
								status: "free",
							},
							{
								name: "Bronze-B3-2-3",
								status: "free",
							},
						],
						3: [
							{
								name: "Bronze-B3-3-1",
								status: "free",
							},
							{
								name: "Bronze-B3-3-2",
								status: "free",
							},
							{
								name: "Bronze-B3-3-3",
								status: "free",
							},
						],
					},
				},
			],
		},
		{
			event_id: 2,
			name: "Silver",
			price: 500,
			subsections: [
				{
					id: 22,
					section_id: 7,
					name: "S1",
					seats_by_rows: {
						1: [
							{
								name: "Silver-S1-1-1",
								status: "free",
							},
							{
								name: "Silver-S1-1-2",
								status: "free",
							},
							{
								name: "Silver-S1-1-3",
								status: "free",
							},
						],
						2: [
							{
								name: "Silver-S1-2-1",
								status: "free",
							},
							{
								name: "Silver-S1-2-2",
								status: "free",
							},
							{
								name: "Silver-S1-2-3",
								status: "free",
							},
						],
						3: [
							{
								name: "Silver-S1-3-1",
								status: "free",
							},
							{
								name: "Silver-S1-3-2",
								status: "free",
							},
							{
								name: "Silver-S1-3-3",
								status: "free",
							},
						],
					},
				},
				{
					id: 23,
					section_id: 7,
					name: "S2",
					seats_by_rows: {
						1: [
							{
								name: "Silver-S2-1-1",
								status: "free",
							},
							{
								name: "Silver-S2-1-2",
								status: "free",
							},
							{
								name: "Silver-S2-1-3",
								status: "free",
							},
						],
						2: [
							{
								name: "Silver-S2-2-1",
								status: "free",
							},
							{
								name: "Silver-S2-2-2",
								status: "free",
							},
							{
								name: "Silver-S2-2-3",
								status: "free",
							},
						],
						3: [
							{
								name: "Silver-S2-3-1",
								status: "free",
							},
							{
								name: "Silver-S2-3-2",
								status: "free",
							},
							{
								name: "Silver-S2-3-3",
								status: "free",
							},
						],
					},
				},
				{
					id: 24,
					section_id: 7,
					name: "S3",
					seats_by_rows: {
						1: [
							{
								name: "Silver-S3-1-1",
								status: "free",
							},
							{
								name: "Silver-S3-1-2",
								status: "free",
							},
							{
								name: "Silver-S3-1-3",
								status: "free",
							},
						],
						2: [
							{
								name: "Silver-S3-2-1",
								status: "free",
							},
							{
								name: "Silver-S3-2-2",
								status: "free",
							},
							{
								name: "Silver-S3-2-3",
								status: "free",
							},
						],
						3: [
							{
								name: "Silver-S3-3-1",
								status: "free",
							},
							{
								name: "Silver-S3-3-2",
								status: "free",
							},
							{
								name: "Silver-S3-3-3",
								status: "free",
							},
						],
					},
				},
			],
		},
		{
			event_id: 2,
			name: "Gold",
			price: 700,
			subsections: [
				{
					id: 26,
					section_id: 8,
					name: "G1",
					seats_by_rows: {
						1: [
							{
								name: "Gold-G1-1-1",
								status: "free",
							},
							{
								name: "Gold-G1-1-2",
								status: "free",
							},
							{
								name: "Gold-G1-1-3",
								status: "free",
							},
						],
						2: [
							{
								name: "Gold-G1-2-1",
								status: "free",
							},
							{
								name: "Gold-G1-2-2",
								status: "free",
							},
							{
								name: "Gold-G1-2-3",
								status: "free",
							},
						],
						3: [
							{
								name: "Gold-G1-3-1",
								status: "free",
							},
							{
								name: "Gold-G1-3-2",
								status: "free",
							},
							{
								name: "Gold-G1-3-3",
								status: "free",
							},
						],
					},
				},
				{
					id: 27,
					section_id: 8,
					name: "G2",
					seats_by_rows: {
						1: [
							{
								name: "Gold-G2-1-1",
								status: "free",
							},
							{
								name: "Gold-G2-1-2",
								status: "free",
							},
							{
								name: "Gold-G2-1-3",
								status: "free",
							},
						],
						2: [
							{
								name: "Gold-G2-2-1",
								status: "free",
							},
							{
								name: "Gold-G2-2-2",
								status: "free",
							},
							{
								name: "Gold-G2-2-3",
								status: "free",
							},
						],
						3: [
							{
								name: "Gold-G2-3-1",
								status: "free",
							},
							{
								name: "Gold-G2-3-2",
								status: "free",
							},
							{
								name: "Gold-G2-3-3",
								status: "free",
							},
						],
					},
				},
				{
					id: 28,
					section_id: 8,
					name: "G3",
					seats_by_rows: {
						1: [
							{
								name: "Gold-G3-1-1",
								status: "free",
							},
							{
								name: "Gold-G3-1-2",
								status: "free",
							},
							{
								name: "Gold-G3-1-3",
								status: "free",
							},
						],
						2: [
							{
								name: "Gold-G3-2-1",
								status: "free",
							},
							{
								name: "Gold-G3-2-2",
								status: "free",
							},
							{
								name: "Gold-G3-2-3",
								status: "free",
							},
						],
						3: [
							{
								name: "Gold-G3-3-1",
								status: "free",
							},
							{
								name: "Gold-G3-3-2",
								status: "free",
							},
							{
								name: "Gold-G3-3-3",
								status: "free",
							},
						],
					},
				},
			],
		},
	],
};

function makeDayInfo(time) {
	const arr = [];

	arr.push({
		startTime: time + 43200000, //12시
		seatCount: 81,
		seats: seats,
	});

	arr.push({
		startTime: time + 61200000, // 17시
		seatCount: 81,
		seats: seats,
	});

	return arr;
}

function makeDateInfo(startDate, days) {
	const result = {};
	for (let i = 0; i <= days; i++) {
		result[startDate + 86400000 * i] = makeDayInfo(startDate + 86400000 * i);
	}
	return result;
}

function makeFunc(topic, posterImgUrl, detailInfoImg, title, place, cast, viewAgeName, startDate, days, runningTime) {
	const result = {
		topic,
		posterImgUrl,
		detailInfoImg,
		title,
		place,
		cast,
		viewAgeName,
		cashPrice: [300, 500, 700],
		startDate,
		endDate: startDate + 86400000 * days,
		preTicketing: [],
		preTicketingList: [],
		runningTime,
		dateInfo: makeDateInfo(startDate, days),
	};

	return result;
}

const data = [];
data.push(
	makeFunc(
		"전시",
		"https://image.toast.com/aaaaab/ticketlink/TKL_1/314x382(1).jpg",
		"http://image.toast.com/aaaaab/ticketlink/TKL_3/t.jpg",
		"프리다 칼로 사진전 / FRIDA KAHLO EXHIBITION",
		"현대백화점 무역센터점",
		"프라다 칼로",
		"전체이용가",
		1677942000000,
		5,
		100
	)
);

data.push(
	makeFunc(
		"전시", // topic
		"https://image.toast.com/aaaaab/ticketlink/TKL_1/main,405.jpg", // posterImgUrl
		"http://image.toast.com/aaaaab/ticketlink/TKL_7/b_bri1201.jpg", // detailInfoImg
		"엉덩이 탐정 플레이파크 미션 대모험", // title
		"현대백화점 미아점,천호점,킨텍스점", // place
		"코난", // cast
		"전체이용가", // viewAgeName
		1675782000000, // startDate
		3, // days
		180 // runningTime
	)
);

data.push(
	makeFunc(
		"전시", // topic
		"https://image.toast.com/aaaaab/ticketlink/TKL_10/dv_pst0816.jpg", // posterImgUrl
		"http://image.toast.com/aaaaab/ticketlink/TKL_7/tl1.jpg", // detailInfoImg
		"뒤뷔페전 - 프랑스 현대미술의 거장 Dubuffet + Villeglé. Une affiche dans la ville", // title
		"올림픽공원 소마미술관 2관", // place
		"뒤뷔페", // cast
		"2세 이상", // viewAgeName
		1674486000000, // startDate
		4, // days
		0 // runningTime
	)
);

data.push(
	makeFunc(
		"전시", // topic
		"https://image.toast.com/aaaaab/ticketlink/TKL_10/hari.jpg", // posterImgUrl
		"http://image.toast.com/aaaaab/ticketlink/TKL_7/tl01(2).jpg", // detailInfoImg
		"하리보 골드베렌 100주년 생일 기념전", // title
		"안녕인사동 B1인사센트럴 뮤지엄", // place
		"하리보", // cast
		"2세 이상", // viewAgeName
		1674486000000, // startDate
		2, // days
		0 // runningTime
	)
);

data.push(
	makeFunc(
		"스포츠", // topic
		"https://image.toast.com/aaaaab/ticketlink/TKL_8/main(1).png", // posterImgUrl
		"http://image.toast.com/aaaaab/ticketlink/TKL_6/1(18).jpg", // detailInfoImg
		"[평창] 휘닉스 평창 올데이/하프데이 패스 22/23 동계시즌", // title
		"강원도 평창군 봉평면 태기로 174 휘닉스파크", // place
		"휘닉스", // cast
		"5세 이상", // viewAgeName
		1672498800000, // startDate
		3, // days
		0 // runningTime
	)
);

data.push(
	makeFunc(
		"스포츠", // topic
		"https://image.toast.com/aaaaab/ticketlink/TKL_7/asl_221004.jpg", // posterImgUrl
		"http://image.toast.com/aaaaab/ticketlink/TKL_2/asl_Web_221004.jpg", // detailInfoImg
		"ASL 시즌14 결승전 | 김지성(T) vs 유영진(T)", // title
		"서울특별시 마포구 매봉산로 31 에스플렉스센터", // place
		"김지성, 유영진", // cast
		"만12세이상", // viewAgeName
		1674486000000, // startDate
		0, // days
		0 // runningTime
	)
);

data.push(
	makeFunc(
		"스포츠", // topic
		"https://image.toast.com/aaaaab/ticketlink/TKL_6/20221101_%EB%B7%B0%EC%9E%89%ED%8C%8C%ED%8B%B0_%ED%8B%B0%EC%BC%93%EC%9D%B4%EB%AF%B8%EC%A7%80_405X500.jpg", // posterImgUrl
		"http://image.toast.com/aaaaab/ticketlink/TKL_5/20221101_%EB%B7%B0%EC%9E%89%ED%8C%8C%ED%8B%B0_%ED%8B%B0%EC%BC%93%EC%9D%B4%EB%AF%B8%EC%A7%80_1120.png", // detailInfoImg
		"더 뜨겁게 FIFA 온라인 4 뷰잉파티 [3차전]", // title
		"경기도 광명시 양지로 17 IVEX 스튜디오", // place
		"손홍민", // cast
		"만19세 이상", // viewAgeName
		1676041200000, // startDate
		2, // days
		0 // runningTime
	)
);

data.push(
	makeFunc(
		"스포츠", // topic
		"https://image.toast.com/aaaaab/ticketlink/TKL_3/OGN-PUBG-0922.jpg", // posterImgUrl
		"http://image.toast.com/aaaaab/ticketlink/TKL_1/OGN-web-0922.jpg", // detailInfoImg
		"PUBG KOREA LEAGUE 2018 #2", // title
		"서울특별시 마포구 매봉산로 31 에스플렉스 센터 15~16층", // place
		"게이머", // cast
		"만15세 이상", // viewAgeName
		1676559600000, // startDate
		3, // days
		0 // runningTime
	)
);

data.push(
	makeFunc(
		"공연", // topic
		"https://image.toast.com/aaaaab/ticketlink/TKL_10/im_pst1111.jpg", // posterImgUrl
		"http://image.toast.com/aaaaab/ticketlink/TKL_2/im_sw_info1111.jpg", // detailInfoImg
		"2022년 임재범 전국투어 콘서트 - 수원", // title
		"경기도 수원시 영통구 광교중앙로 140 수원컨벤션센터", // place
		"임재범", // cast
		"만7세 이상", // viewAgeName
		1674572400000, // startDate
		1, // days
		0 // runningTime
	)
);

data.push(
	makeFunc(
		"공연", // topic
		"https://image.toast.com/aaaaab/ticketlink/TKL_10/z_pst1221.jpg", // posterImgUrl
		"http://image.toast.com/aaaaab/ticketlink/TKL_3/z_noti1221.jpg", // detailInfoImg
		"잔나비 전국투어 <판타스틱 올드 패션드 송년회> - 천안", // title
		"상명대학교 천안캠퍼스 계당관", // place
		"잔나비", // cast
		"7세 이상", // viewAgeName
		1676559600000, // startDate
		3, // days
		0 // runningTime
	)
);

data.push(
	makeFunc(
		"공연", // topic
		"https://image.toast.com/aaaaab/ticketlink/TKL_7/kyj_221027.jpg", // posterImgUrl
		"http://image.toast.com/aaaaab/ticketlink/TKL_2/web1027(1).jpg", // detailInfoImg
		"2023 김연자 라이브 콘서트 - 대구", // title
		"대구광역시 북구 엑스코로 10 엑스코 오디토리움", // place
		"연자킴", // cast
		"10세 이상", // viewAgeName
		1675263600000, // startDate
		0, // days
		0 // runningTime
	)
);

data.push(
	makeFunc(
		"공연", // topic
		"https://image.toast.com/aaaaab/ticketlink/TKL_7/Ashnikko-Poster_1125.jpg", // posterImgUrl
		"http://image.toast.com/aaaaab/ticketlink/TKL_3/a_info_1209.jpg", // detailInfoImg
		"TOUR 2023 아시니코 내한공연", // title
		"서울특별시 마포구 잔다리로 32 왓챠홀", // place
		"아시니코", // cast
		"18세 이상", // viewAgeName
		1680015600000, // startDate
		0, // days
		0 // runningTime
	)
);

const outPath = path.join(__dirname, "/hostData");
fs.writeFileSync(`${outPath}/hostInfo.json`, JSON.stringify(data, null, 2), { encoding: "utf8", flag: "w" });
