const {
  frontEndContractsFile,
  frontEndAbiLocation,
} = require("../helper-hardhat-config");
const fs = require("fs");
const { network } = require("hardhat");
const { UPDATE_FRONT_END } = require("../secret");

module.exports = async () => {
  if (UPDATE_FRONT_END) {
    console.log("Writing to front end...");
    await updateContractAddresses();
    await updateAbi();
    console.log("Front end written!");
  }
};

async function updateAbi() {
  const nftMarketplace = await ethers.getContract("NftMarketPlace");
  fs.writeFileSync(
    `${frontEndAbiLocation}NftMarketplace.json`,
    nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
  );

  const basicNft = await ethers.getContract("BasicNft");
  fs.writeFileSync(
    `${frontEndAbiLocation}BasicNft.json`,
    basicNft.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContractAddresses() {
  console.log(network.config);
  const chainId = network.config.chainId.toString();
  console.log(chainId);
  const nftMarketplace = await ethers.getContract("NftMarketPlace");
  const contractAddresses = JSON.parse(
    fs.readFileSync(frontEndContractsFile, "utf8")
  );
  if (chainId in contractAddresses) {
    if (
      !contractAddresses[chainId]["NftMarketplace"].includes(
        nftMarketplace.address
      )
    ) {
      contractAddresses[chainId]["NftMarketplace"].push(nftMarketplace.address);
    }
  } else {
    contractAddresses[chainId] = { NftMarketplace: [nftMarketplace.address] };
  }
  fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses));
}
module.exports.tags = ["all", "frontend"];
