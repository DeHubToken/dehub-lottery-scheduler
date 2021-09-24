import { ethers, network } from "hardhat";
import {
  TransactionReceipt,
  TransactionResponse
} from "@ethersproject/abstract-provider";
import StandardLotteryAbi from "../../abis/StandardLottery.json";
import config from "../../config";
import { logI, logE } from "../../utils/logger";

const main = async () => {
  const [operator] = await ethers.getSigners();
  logI(`Operator Address: ${operator.address}`);

  const networkName = network.name;
  logI(`Network: ${networkName}`);
  if (networkName === "testnet" || networkName === "mainnet") {
    // Check if the private key is set (see ethers.js signer).
    if (!process.env.OPERATOR_PRIVATE_KEY) {
      throw new Error("Missing private key (signer).");
    }
    // Check if the Dehub Lottery smart contract address is set.
    if (config.StandardLottery.Address[networkName] === ethers.constants.AddressZero) {
      throw new Error("Missing smart contract (Lottery) address.");
    }

    try {
      // Bind the smart contract address to the ABI, for a given network.
      const contract = await ethers.getContractAt(
        StandardLotteryAbi,
        config.StandardLottery.Address[networkName]
      );
      logI(`Contract Address: ${contract.address}`);

      // Get network data for running script.
      const [_blockNumber, _gasPrice, _lotteryId] = await Promise.all([
        ethers.provider.getBlockNumber(),
        ethers.provider.getGasPrice(),
        contract.currentLotteryId()
      ]);

      // Create, sign and broadcast transaction.
      const tx: TransactionResponse = await contract.burnUnclaimed(
        _lotteryId.toString(),
        { gasLimit: 500000, gasPrice: _gasPrice.mul(2), from: operator.address }
      );

      const message =
        `network=${networkName} ` +
        `block=${_blockNumber.toString()} ` +
        `message='Burned unclaimed in standard lottery' ` +
        `hash=${tx?.hash} ` +
        `signer=${operator.address}`;
      logI(message);

      tx.wait().then((receipt: TransactionReceipt) => {
        logI(`Transaction receipt: ${receipt.transactionHash}`);
        return true;
      }, (error) => {
        logE(`Transaction failed: reason=${error.reason} hash=${tx?.hash}`);
      });

    } catch (error) {
      let _error: Error = error as Error;
      const message = `network=${networkName} message='${_error.message}' signer=${
        operator.address
      }`;
      logE(message);
    }
  } else {
    const message = `network=${networkName} message='Unsupported network'`;
    logE(message);
  }

  const balanceLog = `BNB Balance: ${ethers.utils.formatEther(await operator.getBalance())}`;
  logI(balanceLog);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
