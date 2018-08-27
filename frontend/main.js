function upload() {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    let hash = '0x'
      reader.addEventListener("load", function(){
          document.getElementById('fileLoad').style.display = 'block';
          console.log(reader.result);
      }, false);


    reader.onloadend = function() {
      //var sha256 = require('js-sha256').sha256;
      const ipfs = window.IpfsApi('ipfs.infura.io', 5001, {protocol: 'https'}) // Connect to IPFS
      const buf = buffer.Buffer(reader.result) // Convert data into buffer
      console.log(buf)
      console.log(sha256(buf))
      hash = sha256(buf)
      resolve (sha256(buf))
      // sendToContract(hash);
      
      // ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
      //   if(err) {
      //     console.error(err)
      //     return
      //   }
      //   let url = `https://ipfs.io/ipfs/${result[0].hash}`
      //   console.log(`Url --> ${url}`)
      //   document.getElementById("url").innerHTML= url
      //   document.getElementById("url").href= url
      //   document.getElementById("output").src = url
      //   document.getElementById('fileLoad').style.display = 'none';
      // })
      
    }
    const photo = document.getElementById("file");
    reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
  })
}

function sendToContract(hash, name, url, version,date){

  var abi = [ { "constant": true, "inputs": [ { "name": "", "type": "bytes32" } ], "name": "hashInfo", "outputs": [ { "name": "name", "type": "string" }, { "name": "url", "type": "string" }, { "name": "version", "type": "uint256" }, { "name": "date", "type": "uint256" }, { "name": "hashUploader", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newHash", "type": "bytes32" }, { "name": "name", "type": "string" }, { "name": "url", "type": "string" }, { "name": "version", "type": "uint256" }, { "name": "date", "type": "uint256" } ], "name": "AddFileHash", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "queryHash", "type": "bytes32" } ], "name": "CheckFileProvider", "outputs": [ { "name": "name", "type": "string" }, { "name": "url", "type": "string" }, { "name": "version", "type": "uint256" }, { "name": "date", "type": "uint256" }, { "name": "hashUploader", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "newHash", "type": "bytes32" } ], "name": "addHash", "type": "event" } ]
  console.log(web3.currentProvider)
  web3 = new Web3(web3.currentProvider);
  if (typeof web3 === 'undefined') {
    console.log('<div>You need to install <a href=“https://metmask.io“>MetaMask </a> to use this feature.  <a href=“https://metmask.io“>https://metamask.io</a></div>')
  }
  
  var user_address = web3.eth.accounts[0]
  console.log(user_address)
  
  var dankhashContract = web3.eth.contract(abi);
  
  var dankhash = dankhashContract.at('0x0e8bff5f3ecfe9492938a9dd26005a632ce1b753');
  console.log(dankhash);
  
  hash = '0x' + String(hash)
  console.log(hash)
  dankhash.AddFileHash(hash,name,url,version,date,  function(error, result){
   if(!error)
     console.log(result);
   else
     console.error(error)
   });
  }