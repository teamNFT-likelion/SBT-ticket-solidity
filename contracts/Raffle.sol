//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ttot_main.sol";
import "hardhat/console.sol";

contract Raffle_ttot {
    ttot_main public Main;
    constructor(address _addr){
        Main= ttot_main(_addr);
    }

    enum Status { None, Waiting, Ongoing, End } // 래플상태(미등록, 등록, 시작, 완료)
    
    struct RaffleInfo { 
        Status status; 
        address owner; // 참여코드발행자
        string desc; // 설명
        uint endDate; // 마감시간
        uint numsOfPick; // 당첨자수
        address[] whiteList; // 참여가능한 토큰의 hostAddress 목록
        address[] inputList; // 참여한주소목록
        address[] pickedList; // 당첨된주소목록
    }

    mapping(string => RaffleInfo) RaffleMap; // 참여코드 => 래플정보

    function setRaffle(string memory _code, string memory _desc, uint _endDate, uint _numsOfPick, address[] memory _whiteList) public {
        require(RaffleMap[_code].status == Status.None, "already exist code");

        RaffleMap[_code].status = Status.Waiting;
        RaffleMap[_code].owner = msg.sender;
        RaffleMap[_code].desc = _desc;
        RaffleMap[_code].endDate = _endDate;
        RaffleMap[_code].numsOfPick = _numsOfPick;
        RaffleMap[_code].whiteList = _whiteList;
    }

    function setRaffleStart(string memory _code) public {
        require(RaffleMap[_code].owner == msg.sender,"only raffle owner");
        require(RaffleMap[_code].status == Status.Waiting, "already ongoing code");
        require(RaffleMap[_code].endDate > block.timestamp, "out of date");

        RaffleMap[_code].status = Status.Ongoing;
    }

    function checkWhiteList(string memory _code, uint _tokenId) public view returns(bool) {
        if(RaffleMap[_code].whiteList.length == 0){
            return true;
        }
        
        // address hostAddress = Main.SbtTokens(_tokenId)[_tokenId].hostAddress;
        address hostAddress = Main.getHostAddressByTokenId(_tokenId);
        bool checked;
        
        for(uint i; i < RaffleMap[_code].whiteList.length; i++){
            if(hostAddress == RaffleMap[_code].whiteList[i]){
                checked = true;
            }
        }
        return checked;
    }

    function join (string memory _code, uint _tokenId) public { 
        require(RaffleMap[_code].status == Status.Ongoing, "It's not an ongoing Raffle");
        require(RaffleMap[_code].endDate > block.timestamp, "out of date");
        require(Main.ownerOf(_tokenId) == msg.sender); // 토큰소유자 체크
        require(checkWhiteList(_code, _tokenId)); // 화이트 리스트 토큰 체크

        RaffleMap[_code].inputList.push(msg.sender);
    }

    function draw(string memory _code) public returns(address[] memory) {
        require(RaffleMap[_code].owner == msg.sender,"only raffle owner");
        require(RaffleMap[_code].status == Status.Ongoing, "It's not an ongoing Raffle");
        require(RaffleMap[_code].endDate < block.timestamp, "not a draw period");

        RaffleInfo memory info = RaffleMap[_code];
        uint random = uint(keccak256(abi.encodePacked(block.timestamp, info.inputList, info.numsOfPick, block.difficulty)));
        
        address[] memory inputList = info.inputList;
        address[] memory pickedList = new address[](info.numsOfPick);
        uint index;
        while(index < info.numsOfPick){
            pickedList[index] = inputList[random % (inputList.length - index)];
            inputList[random % (inputList.length - index)] = inputList[inputList.length - 1 - index];
            index++;
        }

        RaffleMap[_code].pickedList = pickedList;
        RaffleMap[_code].status = Status.End;

        return pickedList;
    }
    
    modifier existRaffleCode(string memory _code) {
        require(RaffleMap[_code].status != Status.None, "code does not exist.");
        _;
    }

    function getRaffleDescription(string memory _code) public view existRaffleCode(_code) returns(string memory) {
        return RaffleMap[_code].desc;
    }
    function getRaffleEndDate(string memory _code) public view existRaffleCode(_code) returns(uint){
        return RaffleMap[_code].endDate;
    }
    function getRaffleNumsOfPick(string memory _code) public view existRaffleCode(_code) returns(uint) {
        return RaffleMap[_code].numsOfPick;
    }
    function getRaffleInputList(string memory _code) public view existRaffleCode(_code) returns(address[] memory) {
        return RaffleMap[_code].inputList;
    }
    function getRaffleOutputList(string memory _code) public view existRaffleCode(_code) returns(address[] memory) {
        return RaffleMap[_code].pickedList;
    }
}