import { ethers, network } from "hardhat";
import SpecialLotteryAbi from "../../abis/SpecialLottery.json";
import config from "../../config";
import logger from "../../utils/logger";

const main = async () => {
  const [operator] = await ethers.getSigners();

  const networkName = network.name;
  if (networkName === "testnet" || networkName === "mainnet") {
    // Check if the private key is set (see ethers.js signer).
    if (!process.env.OPERATOR_PRIVATE_KEY) {
      throw new Error("Missing private key (signer).");
    }
    // Check if the Dehub Lottery smart contract address is set.
    if (config.SpecialLottery.Address[networkName] === ethers.constants.AddressZero) {
      throw new Error("Missing smart contract (Lottery) address.");
    }

    try {
      // Bind the smart contract address to the ABI, for a given network.
      const contract = await ethers.getContractAt(
        SpecialLotteryAbi,
        config.SpecialLottery.Address[networkName]
      );

      // Get network data for running script.
      const [_blockNumber, _gasPrice, _lotteryId] = await Promise.all([
        ethers.provider.getBlockNumber(),
        ethers.provider.getGasPrice(),
        contract.currentLotteryId()
      ]);

      // Create, sign and broadcast transaction.
      const tx = await contract.closeLottery(
        _lotteryId.toString(),
        { gasLimit: 500000, gasPrice: _gasPrice.mul(2), from: operator.address }
      );

      const message = `[${new Date().toISOString()}] \
        network=${networkName} \
        block=${_blockNumber.toString()} \
        message='Closed special lottery' \
        hash=${tx?.hash} \
        signer=${operator.address}`;
      console.log(message);
      logger.info({ message });

    } catch (error) {
      const message = `[${new Date().toISOString()}] network=${networkName} message='${error.message}' signer=${
        operator.address
      }`;
      console.error(message);
      logger.error({ message });
    }
  } else {
    const message = `[${new Date().toISOString()}] network=${networkName} message='Unsupported network'`;
    console.error(message);
    logger.error({ message });
  }

  console.log(operator);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
