var User = artifacts.require("User");

module.exports = function(deployer) {
  deployer.deploy(User, 1, 28,0, "CAO @ Servntire");
};
