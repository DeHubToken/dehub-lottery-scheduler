import { ethers, network } from 'hardhat';
import moment from 'moment';
import sgMail, { ResponseError, ClientResponse } from '@sendgrid/mail';
import { logI, logE } from './logger';
import config from '../config';
import ERC20Abi from '../abis/ERC20.json';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

/**
 * Get the next lottery 'endTime', based on current date, as UTC.
 * Used by 'start-lottery' Hardhat script, only.
 */
export const getEndTime = (seconds: number) => {
  return moment().add(seconds, 'seconds').startOf('hour').utc().unix();

  // return moment().add(seconds, 'seconds').utc().unix();
};

export const emailTransError = async ({
  from = config.SendGrid.from,
  to = config.SendGrid.to,
  subject = config.SendGrid.subject,
  reason,
  txid,
  signer,
}: {
  from?: string;
  to?: string;
  subject?: string;
  reason: string;
  txid: string;
  signer: string;
}) => {
  try {
    const html =
      `<h1>Transaction Error</h1><br />` +
      `<strong>Reason</strong>: ${reason}<br />` +
      `<strong>Txid</strong>: ${txid}<br />` +
      `<strong>Signer</strong>: ${signer}`;

    sgMail.setApiKey(`${process.env.SENDGRID_APIKEY}`);
    const [result] = await sgMail.send({
      from,
      to,
      subject,
      html,
    });
    if (result.statusCode === 202) {
      const message = `Send email successfully, reason=${reason}, txid=${txid}`;
      logI(message);
    } else {
      const message =
        `Failed to send email, ` +
        `reason=${reason} ` +
        `txid=${txid} ` +
        `code=${result.statusCode}, ` +
        `message=${result.body}`;
      logE(message);
    }
  } catch (error) {
    const err: ResponseError = error as ResponseError;
    const message = `Failed to send email, code=${err.code}, message=${err.message}`;
    logE(message);
  }
};

const emailTransReport = async ({
  from = config.SendGrid.from,
  to = config.SendGrid.to,
  subject = config.SendGrid.subject,
  operator,
  isReportBNB,
  isReportLINK,
}: {
  from?: string;
  to?: string;
  subject?: string;
  operator: string;
  isReportBNB: string | undefined;
  isReportLINK: string | undefined;
}) => {
  try {
    const html =
      `<h1>Not enough token amount</h1><br />` +
      `<strong>Operator Address</strong>: ${operator}<br />` +
      `${
        isReportBNB ? `<strong>BNB Amount</strong>: ${isReportBNB}<br />` : ''
      }` +
      `${
        isReportLINK
          ? `<strong>LINK Amount</strong>: ${isReportLINK}<br />`
          : ''
      }`;

    sgMail.setApiKey(`${process.env.SENDGRID_APIKEY}`);
    const [result] = await sgMail.send({
      from,
      to,
      subject,
      html,
    });
    if (result.statusCode === 202) {
      const message = `Send report email successfully`;
      logI(message);
    } else {
      const message =
        `Failed to send report email, ` +
        `code=${result.statusCode}, ` +
        `message=${result.body}`;
      logE(message);
    }
  } catch (error) {
    const err: ResponseError = error as ResponseError;
    const message = `Failed to send email, code=${err.code}, message=${err.message}`;
    logE(message);
  }
};

export const reportAmount = async (
  operator: SignerWithAddress,
  networkName: 'mainnet' | 'testnet'
) => {
  const linkAddress = config.Chainlink.LINK[networkName];
  const linkContract = await ethers.getContractAt(ERC20Abi, linkAddress);
  const deHubRandAddress = config.Chainlink.DeHubRand[networkName];

  const bnbAmount = await operator.getBalance();
  const linkAmount = await linkContract.balanceOf(deHubRandAddress);

  const BIG_TEN = ethers.BigNumber.from(10).pow(18);

  const isReportBNB = bnbAmount.lt(BIG_TEN.mul(config.Report.BNB))
    ? ethers.utils.formatEther(bnbAmount)
    : undefined;

  const isReportLINK = linkAmount.lt(BIG_TEN.mul(config.Report.LINK))
    ? ethers.utils.formatEther(linkAmount)
    : undefined;

  if (isReportBNB || isReportLINK) {
    emailTransReport({ operator: operator.address, isReportBNB, isReportLINK });
  }
};
