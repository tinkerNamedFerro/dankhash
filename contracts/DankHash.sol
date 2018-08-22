pragma solidity ^0.4.23;

import "./safemath.sol";

contract DankHash {
    //Importing safemath
    using SafeMath for uint256;
    //Set Owner of Contract
    address owner;
    //bytes32 public hashes;
    

    //Bi-Directional mapping 
    // This allows for the value to find the key and vise versa 
    //https://ethereum.stackexchange.com/questions/4272/getting-key-from-solidity-mapping-by-value
    mapping (address => bytes32) public address2FileHash;
    mapping (bytes32 => address) public fileHash2Address;
    mapping (bytes32 => HashDesc) public hashInfo;

    struct HashDesc {
        string name;
        uint version; 
        uint256 date; //https://ethereum.stackexchange.com/questions/32173/how-to-handle-dates-in-solidity-and-web3/32179
    }

    event addHash (bytes32 newHash);

    //Checking for hash size is impossible as all values are a vaild hash
    // modifier checkHashSize (bytes32 hash){
    //     require(hash.length == 64, "Input is not correct length");
    //     _;
    // }

    constructor() public {
        owner = msg.sender;
    }
    //function AddFileHash(bytes32 newHash) public checkHashSize(newHash) returns (bytes32){
    function AddFileHash(bytes32 newHash) public returns (uint){
        emit addHash(newHash);
        address2FileHash[msg.sender] = newHash;
        fileHash2Address[newHash] = msg.sender;
        SafeMath.add(0, 1);
        return newHash.length;
    }

    function CheckFileProvider(bytes32 queryHash) public view  returns (address) {
        return fileHash2Address[queryHash];
    }

}