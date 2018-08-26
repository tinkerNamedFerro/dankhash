# Avoding Common Attacks 

Below is a list of common attacks used on solidity contracts. Where not all these attack vectors affect the DankHash contract they all have been considered during the course of development. The functionality of this contract is currently fairly basic. Most common attacks rely on contract complexity to hide bugs that can be exploited.

### Race Conditions
Race conditions is one of the most common soldity attacks. It involves calling an external contract that takes control of the program flow and changes the data the calling function wasn't expecting. In the current stage of development dashhash doesn't need to call external functions during operation making this attack vector impossible. However in the future DankHash will support Ethereum Name Service which would need to use external functions to execute reverse registers between eth address and their attached Domain names.To avoid  race condition attacks dankhash will limit external calls to the end of a transactions operation thus reducing the impact it will have on the rest of the contract.

### DoS with Block Gas Limit
Dos attacks via gas limits stops the execute of a contract by clogging up the contract in operations that require a large amount of gas. I really common Dos attacks involves looping over arrays, for example an array of addresses. To avoid this attack on dankhash the contract was modified to only use mappings. This makes it impossible to loop as it's a 1 to many relationship.

### Integer Overflow and Underflow
Integar over/under flows occur when a variable goes outside the domain of possible values. This results in the variable looping so 0 -1 = 256 and 256 + 1 = 0. By implementing the safemath contract into dankhash it ensures that all math operates can't be manipluated to enduce this undesired output.

