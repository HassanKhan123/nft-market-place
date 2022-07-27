const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-blocks");
// const { moveBlocks } = require("../utils/move-blocks");

const PRICE = ethers.utils.parseEther("0.1");

async function mint() {
  const nftMarketplace = await ethers.getContract("NftMarketPlace");
  const randomNumber = Math.floor(Math.random() * 2);
  let basicNft;
  //   if (randomNumber == 1) {
  //     basicNft = await ethers.getContract("BasicNftTwo");
  //   } else {
  //     basicNft = await ethers.getContract("BasicNft");
  //   }
  basicNft = await ethers.getContract("BasicNft");
  console.log("Minting NFT...");
  const mintTx = await basicNft.mintNft();
  const mintTxReceipt = await mintTx.wait(1);
  console.log(mintTxReceipt.events[0].args.tokenId.toString());
  console.log(basicNft.address);

  console.log("NFT Listed!");
  if (network.config.chainId == 31337) {
    // Moralis has a hard time if you move more than 1 at once!
    await moveBlocks(1, (sleepAmount = 1000));
  }
}

mint()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
