const { ethers, upgrades } = require("hardhat");
const PROXY_CONTRACT_ID = "0x5eC20e212789920B9952c2033E311f0E435D5636";

async function main() {
  const Greeter = await ethers.getContractFactory("GreeterV2");
  const greeter = await upgrades.upgradeProxy(PROXY_CONTRACT_ID, Greeter);
  console.log("Deploying...: ", greeter.address);
  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
