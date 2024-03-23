
const ethers = require('ethers');
require('dotenv').config();
const contractname = "SuperTontineSimple";

const host_mumbai = "0xEB796bdb90fFA0f28255275e16936D25d3418603";
const cfa_mumbai = "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873";
const supertoken_mumbai="0x96B82B65ACF7072eFEb00502F45757F254c2a0D4";

async function main() {

  const url = process.env.ALCHEMY_MUMBAI_URL;

  let artifacts = await hre.artifacts.readArtifact(contractname);

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.PRIVATE_KEY_MUMBAI;

  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let faucet = await factory.deploy(supertoken_mumbai,host_mumbai,cfa_mumbai);

  console.log("Contract deployed to address :", faucet.address);

  await faucet.deployed();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});
