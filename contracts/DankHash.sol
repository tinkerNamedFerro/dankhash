pragma solidity ^0.4.23;

import "./safemath.sol";

/** @title DankHash - Archive of sha256 hashs to sensitive files that's immutable. Now there's one decentralised resource that can be accessed to make sure youu're downloading the files you want */
contract DankHash {
    //Importing safemath
    using SafeMath for uint256;
    //Set Owner of Contract
    address owner;
    //bytes32 public hashes;
    

    //Bi-Directional mapping 
    // This allows for the value to find the key and vise versa 
    //https://ethereum.stackexchange.com/questions/4272/getting-key-from-solidity-mapping-by-value
    //mapping (address => bytes32) public address2FileHash;
    //mapping (bytes32 => address) public fileHash2Address;
    mapping (bytes32 => HashDesc) public hashInfo;

    struct HashDesc {
        string name;
        string url;
        uint version; 
        uint256 date; //https://ethereum.stackexchange.com/questions/32173/how-to-handle-dates-in-solidity-and-web3/32179
        address hashUploader;
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
    function AddFileHash(bytes32 newHash, string name, string url, uint version, uint date) public returns (bool){
        emit addHash(newHash);
        //Check if hash is new or be the same owner
        if (hashInfo[newHash].hashUploader == address(0x0) || hashInfo[newHash].hashUploader == msg.sender){ 
            hashInfo[newHash].name = name;
            hashInfo[newHash].url = url;
            hashInfo[newHash].version = version;
            hashInfo[newHash].date = date;
            hashInfo[newHash].hashUploader = msg.sender;
            return true;
        } else {
            return false;
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