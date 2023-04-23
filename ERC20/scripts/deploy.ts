import { ethers } from "ethers";
import Token from "../artifacts/contracts/Token.sol/Token.json";
import * as dotenv from 'dotenv';
dotenv.config();

async function main(){
    const privateKey: string = process.env.PRIVATE_KEY ?? "";
    if (privateKey === "") {
        throw new Error('No value set for environment variable PRIVATE_KEY');
    }

  const INFURA_KEY: string = process.env.INFURA_KEY ?? "";
    if (INFURA_KEY === "") {
        throw new Error('No value set for environment variable INFURA_KEY');
    }

    const provider = new ethers.providers.JsonRpcProvider(
      `https://goerli.infura.io/v3/${INFURA_KEY}`
    );
    const signer = new ethers.Wallet(privateKey, provider);

    const factory = new ethers.ContractFactory(Token.abi, Token.bytecode, signer);
    const contract = await factory.deploy();
    console.log(`ERC20 contract deploy address ${contract.address}`);
    await contract.deployed();
    console.log(`Deploy completed`)
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
