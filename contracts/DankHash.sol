pragma solidity ^0.4.23;

import "./safemath.sol";

/** @title DankHash - Archive of sha256 hashs to sensitive files that's immutable. Now there's one decentralised resource that can be accessed to make sure youu're downloading the files you want */
contract DankHash {
    //Importing safemath
    using SafeMath for uint256;
    //Set Owner of Contract
    mapping(address => bool)admins;

    constructor() public {
        admins[msg.sender] = true;
    }

    modifier onlyAdmin{
        require(admins[msg.sender]==true,"Address not admin");
        _;
    }

    function addAdmin (address _a) public onlyAdmin returns (bool){
        admins[_a] = true;
        return true;
    }

    function kill() public onlyAdmin{
        selfdestruct(msg.sender);
    }

    bool public stopped = false;

    modifier stopInEmergency{require(!stopped,""); _;}
    modifier onlyInEmergency{require(stopped,""); _;}
   
    function switchStopped() public onlyAdmin {
        stopped = !stopped; //toggle stopped so true = false and false = true
    }

    mapping (bytes32 => HashDesc) public hashInfo;

    struct HashDesc {
        string name;
        string url;
        uint version; 
        uint256 date; //https://ethereum.stackexchange.com/questions/32173/how-to-handle-dates-in-solidity-and-web3/32179
        address hashUploader;
    }

    event addHash (bytes32 newHash);

     /** @dev Calculates a rectangle's surface and perimeter.
      * @param newHash Width of the rectangle.
      * @param name Height of the rectangle.
      * @param url Height of the rectangle.
      * @param version Height of the rectangle.
      * @param date Height of the rectangle.
      * @return s The calculated surface.
      * @return p The calculated perimeter.
      */
    function AddFileHash(bytes32 newHash, string name, string url, uint version, uint date) public returns (bool, bytes32){
        emit addHash(newHash);
        //Check if hash is new or be the same owner
        if (hashInfo[newHash].hashUploader == address(0x0) || hashInfo[newHash].hashUploader == msg.sender){ 
            hashInfo[newHash].name = name;
            hashInfo[newHash].url = url;
            hashInfo[newHash].version = version;
            hashInfo[newHash].date = date;
            hashInfo[newHash].hashUploader = msg.sender;
            return (true, newHash);
        } else {
            return (false, newHash);
        }
        
    }

    function CheckFileProvider(bytes32 queryHash) public view  returns (string name, string url, uint version, uint date, address hashUploader) {
        name = hashInfo[queryHash].name;
        url = hashInfo[queryHash].url;
        version = hashInfo[queryHash].version;
        date = hashInfo[queryHash].date;
        hashUploader = hashInfo[queryHash].hashUploader;

        return(name, url, version, date, hashUploader);
    }

}