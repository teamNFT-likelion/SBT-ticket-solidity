// ttot_host.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ttot_main.sol";

contract ttot_host {
    address host;
    ttot_main public mainContract;
    constructor(address _mainContractAddress, string memory _hostName) {
        mainContract = ttot_main(_mainContractAddress);
        Host.hostName = _hostName;
        host = msg.sender;
    }

    struct hostData {
        string hostName;
        mapping(uint256 => uint256) limitOfDate;
        mapping(uint256 => string[]) seatsOfDate;
    }
    hostData Host;

    // 오너가 각 공연날짜와 날짜에 따른 좌석 수 세팅
    function setDateAndLimit(uint256 _date, uint256 _limit) public {
        require(msg.sender == host, "Host only.");
        require(Host.limitOfDate[_date] == 0, "That date has already been set.");
        Host.limitOfDate[_date] = _limit;
    }

    // main 컨트랙트를 통해 push하도록
    function pushSeat(uint256 _date, string[] memory _seats) external {
        require(msg.sender == address(mainContract), "Is not main contract.");
        uint256 _numberOfSeats = _seats.length;
        require(_numberOfSeats > 0, "Please choose the seat.");
        require(Host.limitOfDate[_date] >= _numberOfSeats, "All the seats were sold out on that date.");

        Host.limitOfDate[_date] -= _numberOfSeats;

        for (uint256 i=0; i<_numberOfSeats; i++) {
            Host.seatsOfDate[_date].push(_seats[i]);
        }
    }

    // main 컨트랙트를 통해 pop하도록
    function popSeat(uint256 _date, string[] memory _seats) external {
        require(msg.sender == address(mainContract), "Is not main contract.");
    
        for (uint256 i=0; i<_seats.length; i++) {
            for (uint256 j=0; j<Host.seatsOfDate[_date].length; j++) {
                if (keccak256(bytes(_seats[i])) == keccak256(bytes(Host.seatsOfDate[_date][j]))) {
                    Host.seatsOfDate[_date][j] = Host.seatsOfDate[_date][Host.seatsOfDate[_date].length-1];
                    Host.seatsOfDate[_date].pop();
                    Host.limitOfDate[_date]++;
                    break;
                }
            }
        }
    }

    // 해당하는 날짜의 좌석들 보기
    function getSeats(uint256 _date) public view returns(string[] memory){
        return Host.seatsOfDate[_date];
    }
}