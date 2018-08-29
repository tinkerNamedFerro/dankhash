# DankHASH
DankHASH is a decentralised file author verifier using SHA256. Authors can upload file hashs of their software with general info like version, name and website and users can ensure the software their downloading isn't tempered. The current issue in regards to PGP software signing is you have to trust that the PGP key belongs to the person or organisation which distrubed the software. However, explained [here](https://youtu.be/b4b8ktEV4Bg?list=UU9-y-6csu5WGm29I7JiwpnA&t=394) if an  attacker was able to gain access to the website it's very easy for them to change the hash to their pwned file. An example of this bad practice can be found of the [kali linux website](https://www.kali.org/downloads/).

*DankHASH inspires to become an untamperable repository of file hashes where users can easily test all their softwares validity *

### See For Yourself
Visit [www.dankhash.org](http://www.dankhash.org/) for live demo or download yourself
##### Deploying yourself
1) Move Frontend directory to a web server like digital ocean or IPFS (for you cool cats)
2) Before deploying the contract I recommend using the truffle test file to ensure everything is kinda working.
2a) [Getting Node](https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/),,
```
$ npm install -g truffle //DOWNOAD TRUFFLE
$ npm install -g ganache-cli //DOWNLOAD GANACHE-CLI
[OPEN NEW TERMINAL TAB]
$ ganache-cli //Leave this bad boy open
[RETURN TO FIRST TERMINAL TAB]
$ git clone https://github.com/tinkerNamedFerro/dankhash.git //GET THE DANK HASH 
$ cd ./dankhash
$ truffle test
```
3. If all is green, copy&paste into remix and damn got your own contract.



### Future Goals
* Add user voting on file hashes so validate malware and other harmful software. Users can link ipfs urls to their findings via IDA or Sandboxing.
* Implement ENS with reverse register so wallets can link to domain names so users can easily see who submitted the file hash.



