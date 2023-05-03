import { ethers } from "ethers";
import Token from "../artifacts/contracts/Token.sol/Token.json";
import * as dotenv from 'dotenv';
dotenv.config();

const DEFAULT_ADMIN_ROLE =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
const PAUSER_ROLE =
    "0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a";
const BURNER_ROLE =
    "0x3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a848";

async function main(){
  const privateKey: string = process.env.PRIVATE_KEY ?? "";
  if (privateKey === "") {
    throw new Error("No value set for environment variable PRIVATE_KEY");
  }
  const OTHER_ADDRESS_PRIVATE_KEY: string =
    process.env.OTHER_ADDRESS_PRIVATE_KEY ?? "";
  if (OTHER_ADDRESS_PRIVATE_KEY === "") {
    throw new Error(
      "No value set for environment variable OTHER_ADDRESS_PRIVATE_KEY"
    );
  }

  const RELAY_ADDRESS: string = process.env.RELAY_ADDRESS ?? "";
  if (RELAY_ADDRESS === "") {
    throw new Error("No value set for environment variable RELAY_ADDRESS");
  }

  const INFURA_KEY: string = process.env.INFURA_KEY ?? "";
  if (INFURA_KEY === "") {
    throw new Error("No value set for environment variable INFURA_KEY");
  }

  const PUBLIC_KEY: string = process.env.PUBLIC_KEY ?? "";
  if (PUBLIC_KEY === "") {
    throw new Error("No value set for environment variable PUBLIC_KEY");
  }

  const decimals: number = 18;

  const provider = new ethers.providers.JsonRpcProvider(
    `https://goerli.infura.io/v3/${INFURA_KEY}`
  );
  // Ownerのアドレス
  const signer = new ethers.Wallet(privateKey, provider);
  // その他のアドレス
  const otherAddress = new ethers.Wallet(OTHER_ADDRESS_PRIVATE_KEY, provider);

  const contractAddress: string = "0xFE61b80207708c9a8b3C43fa84Ee7fA8F31420a8";

  const contract = new ethers.Contract(contractAddress, Token.abi, signer);

  // Ownerに対してERC20トークンをMint
  const tx = await contract.mint(
    PUBLIC_KEY,
    ethers.utils.parseUnits("100", decimals)
  );

  console.log(`tx.hash: ${tx.hash}`);
  console.log("mint completed");

  // コントラクトを停止
  const pauseTx = await contract.pause();
  await pauseTx.wait();
  console.log("pause completed");

  // コントラクトを再起動
  const unpauseTx = await contract.unpause();
  await unpauseTx.wait();
  console.log("unpause completed");

  // // コントラクトを停止(権限がないため失敗する)
  // await contract.connect(otherAddress).pause({ gasLimit: 300000 });
  // console.log("cannot pause completed");

  // // RELAY_ADDRESSにロールの付与
  const grantRoleTx = await contract.grantRole(PAUSER_ROLE, RELAY_ADDRESS);
  await grantRoleTx.wait();
  console.log("grantRole completed");

  // ロールの削除
  const revokeRoleTx = await contract.revokeRole(
    PAUSER_ROLE,
    otherAddress.address
  );
  await revokeRoleTx.wait();
  console.log("revokeRole completed");

  // ロールの付与(権限がないため失敗する)
  // await contract
  //   .connect(otherAddress)
  //   .grantRole(PAUSER_ROLE, signer.address, { gasLimit: 300000 });

  // console.log("cannnot grantRole completed");

  // ERC20トークンを燃やす
  const burnTx = await contract.burn(ethers.utils.parseUnits("1", decimals));
  await burnTx.wait();
  console.log("burn completed");

  // ERC20トークンをTransfer
  const transferTxHash = await contract.transfer(
    otherAddress.address,
    ethers.utils.parseUnits("10", decimals)
  );

  console.log(`transfer transaction hash: ${transferTxHash.hash}`);

  // ERC20トークンを燃やす(権限がないため失敗する)
  await contract
    .connect(otherAddress)
    .burn(ethers.utils.parseUnits("1", decimals), { gasLimit: 300000 });
  console.log("cannot burn completed");
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
