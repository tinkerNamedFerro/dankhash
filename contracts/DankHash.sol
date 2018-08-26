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
     
      /** @dev This function adds to the list of approved admins that can interact with the contract.
      * @param _a A address representing the user that will gain admin permissions
      * @return bool returns true if the address has admin permissions
      */
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


     /** @dev This function is used to change the state of a circuit breaker design pattern, when the function is called it switches the state of the stopped variable.
      * @return stopped returns the new state of the circuit breaker variable
      */
    function switchStopped() public onlyAdmin returns (bool){
        stopped = !stopped; //toggle stopped so true = false and false = true
        return(stopped);
    }
    
    mapping (bytes32 => HashDesc) public hashInfo; // This mapping connects file hashs to to their general info struct

    struct HashDesc { //General Info Struct for file hashes. 
        string name;
        string url;
        uint version; 
        uint256 date; //https://ethereum.stackexchange.com/questions/32173/how-to-handle-dates-in-solidity-and-web3/32179
        address hashUploader;
    }

    event addHash (bytes32 newHash);

     /** @dev This function allows users to submit a SHA256 file hash and general info related to the file.
      * @param newHash A bytes32 variable that represents a SHA256 hash of a file.
      * @param name A string variable that represents the filename of hash.
      * @param url A string variable that represents the URL where the file can be downloaded from.
      * @param version A int representing the version number of the file, currently doesn't support floating point numbers.
      * @param date A int that's only 6 digits long representing the date. e.g 25 of March 2018 would equal 250318
      * @return status returns a bool, true is successful and false is unsuccessful.
      * @return newhash returns bytes32 of the input array for the frontend 
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
      /** @dev This a stateless function used by the frontend to get info relating to file hash.
      * @param queryHassh A bytes32 variable that represents a SHA256 hash of a file.
      * @return name returns a string representing the name of the file hash
      * @return url returns a string representing the URL of where the file can be accessed 
      * @return version returns an int representing the version number of the file
      * @return date returns an int representing the date of file hash upload
      * @return hashUploader returns an address representing witch user uploaded the file.
      */
    function CheckFileProvider(bytes32 queryHash) public view  returns (string name, string url, uint version, uint date, address hashUploader) {
        name = hashInfo[queryHash].name;
        url = hashInfo[queryHash].url;
        version = hashInfo[queryHash].version;
        date = hashInfo[queryHash].date;
        hashUploader = hashInfo[queryHash].hashUploader;

        return(name, url, version, date, hashUploader);
    }

}