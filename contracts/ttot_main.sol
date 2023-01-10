// ttot_main.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ttot_host.sol";

/*
    SCENARIO

    *필수
    1. 1번 지갑으로 main 컨트랙트 생성
    2. 2번 지갑으로 host 컨트랙트 생성. (main주소, blackpink)
    3. 2번 지갑으로 host 컨트랙트에서 setDateAndLimit 실행 (1671800000, 100) / (1684000000, 100)
    4. 1번 지갑으로 main 컨트랙트에서 setHost 실행 (host주소)

    5. 3번 지갑으로 main 컨트랙트 mintSbt 실행 msg.value값도 1ETHER. (AAA, 1671800000, host주소, 1000000000000000000, ["A1", "A2"])
    6. 아무 지갑으로 host 컨트랙트에서 자리가 잘 들어갔는지 getSeats 실행. (1671800000)
    7. 내가 가진 Sbt 확인. getSbtTokens 실행. console에 decoded output에 있음.
    8. 내가 가진 Sbt 환불. refundSbtToken 실행. 단, deadline이 넘지않은 활성화되어 있는 토큰이어야함. (1)
    9. getSbtTokens 실행해보고, getSeats 실행해보고, 내 잔고의 양도 확인해보면서 환불이 잘 되었는지 확인.
*/

contract ttot_main is ERC721Enumerable {
    // 컨트랙트 생성자를 owner로 등록
    address payable owner;
    constructor() ERC721("TicketToToken", "TTOT") payable {
        owner = payable(msg.sender);
    }

    // SBT 토큰으로 만들기 위해 isTransferable로 송금 막아놓음
    mapping(uint256 => bool) isTransferable;
    modifier transferable(uint256 tokenId) {
        require(isTransferable[tokenId], "This is SBT.");
        _;
    }

    // tokenId를 카운트하기 위해
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // sbt에 들어갈 데이터
    struct sbtTokenData {
        uint256 sbtTokenId; // id
        string sbtTokenURI; // image, title, userEmail ...
        uint256 deadline; // 티켓이 끝나는 시점
        address hostAddress; // 주최측의 주소
        uint256 price;  // 환불할 때 필요한 티켓 가격
        string[] seats; // 환불할 때 필요한 선택 좌석들
        bool isOngoing; // 사용 중인 티켓인가?
    }
    mapping (uint256 => sbtTokenData) SbtTokens;
    mapping (address => ttot_host) Hosts;


    // 주최측 등록
    function setHost(address _addr) public {
        require(address(ttot_host(_addr).mainContract()) == address(this));
        Hosts[_addr] = ttot_host(_addr);
    }

    
    // 주최측 확인
    function getHost(address _addr) public view returns(ttot_host){
        return Hosts[_addr];
    }


    // 티켓 구매와 발행
    // tokenURI는 ipfs 주소, deadline은 unix timestamp 형태, price는 wei단위, hostAddress는 주최측 컨트랙트 주소, seats는 선택한 좌석들
    function mintSbt(string memory _tokenURI, uint256 _deadline, address _hostAddress, uint256 _price, string[] memory _seats, uint256 _inactiveId) public payable {
        require(_price <= msg.value && msg.value <= address(msg.sender).balance, "caller sent lower than price.");
        
        // _inactiveId가 0이 아니면(사전예매 시 사용할 inactiveId가 선택되었으면) ongoing->done
        if(_inactiveId!=0){
            require(SbtTokens[_inactiveId].isOngoing==true,"This is not INACTIVE ticket.");
            SbtTokens[_inactiveId].isOngoing = false;
        }
        
        // 함수 실행 시, tokenId값 하나씩 증가
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        // 주최측에 자리 추가
        Hosts[_hostAddress].pushSeat(_deadline, _seats);

        // 토큰의 정보 저장 후 mint 실행
        SbtTokens[tokenId] = sbtTokenData(tokenId, _tokenURI, _deadline, _hostAddress, _price, _seats, true);
        _mint(msg.sender, tokenId);

        // SBT로 만들기 위해 송금 불가로 만듦
        isTransferable[tokenId] = false;
    }


    // 내가 가진 SBT 확인
    function getSbtTokens() public view returns(sbtTokenData[] memory) {
        // 오너가 가진 토큰 양
        uint256 balanceLength = balanceOf(msg.sender);
        sbtTokenData[] memory myTokenData = new sbtTokenData[](balanceLength);

        // 오너가 가진 토큰들의 아이디를 뽑아와 새로운 배열에 저장
        for (uint256 i=0; i<balanceLength; i++) {
            uint256 sbtTokenId = tokenOfOwnerByIndex(msg.sender, i);
            myTokenData[i] = SbtTokens[sbtTokenId];
        }

        return myTokenData;
    }


    // 환불기능
    function refundSbtToken(uint256 _tokenId) public {
        // 해당 토큰의 오너를 저장.
        address addr_owner = ownerOf(_tokenId);
        require(addr_owner == msg.sender, "msg.sender is not the owner of the token");
        require(block.timestamp <= SbtTokens[_tokenId].deadline, "This ticket is not active status");

        // 오너에게 구매한 가격만큼 환불
        payable(addr_owner).transfer(SbtTokens[_tokenId].price);

        // 환불한 자리 빼기
        Hosts[SbtTokens[_tokenId].hostAddress].popSeat(SbtTokens[_tokenId].deadline, SbtTokens[_tokenId].seats);

        // 해당 토큰은 burn
        _burn(_tokenId);

        // 해당 토큰의 정보 삭제
        delete SbtTokens[_tokenId];
    }


    // 전부 사용한 토큰 소각
    function burnSbtToken(uint256 _tokenId) public {
        address addr_owner = ownerOf(_tokenId);
        require(addr_owner == msg.sender, "msg.sender is not the owner of the token");
        require(block.timestamp > SbtTokens[_tokenId].deadline, "This ticket is active status");

        // 해당 토큰은 burn
        _burn(_tokenId);

        // 해당 토큰의 정보 삭제
        delete SbtTokens[_tokenId];
    }



    // transferFrom override for SBT
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override transferable(tokenId) {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");

        _transfer(from, to, tokenId);
    }

    // safeTransferFrom override for SBT
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override transferable(tokenId) {
        safeTransferFrom(from, to, tokenId, "");
    }

    // safeTransferFrom override for SBT
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override transferable(tokenId) {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
        _safeTransfer(from, to, tokenId, data);
    }
}