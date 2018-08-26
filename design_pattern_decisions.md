# Design Patterns

Below is a list of design patterns using in the development of dankhash. These patterns help the security and scalability of the contract, thus reducing the threat to the main stakeholders.

### Fail early and fail loud
When the contract needs any boolean logic, instead of containing logic in an IF statement, boolean logic is contained within require statments. The benefits to this pattern include reduced gas fees as it checks the condition as early as possible. It also gives a precise statement when an error occurs. This design patter was used to help error checking during development and to reduce fees for users.

```sh
function AddFileHash(bytes32 newHash, string name, string url, uint version, uint date) public returns (bool){
        require (hashInfo[newHash].hashUploader == address(0x0));
        ...
```
### Restricted access
Allows functions to have restricted access. The most common modifier is *onlyAdmin*, this restricts functions to only allow the contract creator to execute. This pattern is used to make modifications after the contract has been deployed to change settings without redeploying it.

```sh
  mapping(address => bool)admins;
    modifier onlyAdmin{
        require(admins[msg.sender]==true,"Address not admin");
        _;
    }
    function addAdmin (address _a) public onlyAdmin returns (bool){
        admins[_a] = true;
        return true;
    }
```

### Mortal
Used to make iterative development more straightforward. This design pattern allows contract destruction to be authorised by the contract creator. This pattern was a fail-safe decision so if a critical error was discovered after deployment it can be removed before it affects users.

```sh
    function kill() public onlyAdmin{
        selfdestruct(msg.sender);
    }
```

### Circuit breaker
The circuit breaker design pattern is used to stop functions executing. If there is a bug in a fuction instead of destroying the entire contract the specific function can be disabled. This is useful if you want to keep view/constant functions for archival purposes. Another fail-safe decision, this pattern disables the addHashFile function so users can still read old file hashes. 

```sh
    bool public stopped = false;
    modifier stopInEmergency{require(!stopped,""); _;}
    modifier onlyInEmergency{require(stopped,""); _;}
   
    function switchStopped() public onlyAdmin {
        stopped = !stopped; //toggle stopped so true = false and false = true
    }
```
