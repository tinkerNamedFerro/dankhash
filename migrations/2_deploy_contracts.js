var DankHash = artifacts.require("./DankHash.sol");

module.exports = function(deployer) {
  //deployer.deploy(SimpleBank);
  deployer.deploy(DankHash);
};