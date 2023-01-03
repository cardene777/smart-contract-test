const { ethers, upgrades } = require("hardhat");
const PROXY_CONTRACT_ID = ""; // 最初にデプロイした時のコントラクトID。

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
