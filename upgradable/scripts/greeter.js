const { ethers, upgrades } = require("hardhat");

async function main() {
  const Greeter = await ethers.getContractFactory("GreeterV1");
  const greeter = await upgrades.deployProxy(Greeter, [], {
    initializer: "initialize",
  });
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
