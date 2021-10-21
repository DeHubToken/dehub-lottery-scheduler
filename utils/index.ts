import moment from "moment";
import sgMail, { ResponseError, ClientResponse } from "@sendgrid/mail";
import { logI, logE } from "./logger";

/**
 * Get the next lottery 'endTime', based on current date, as UTC.
 * Used by 'start-lottery' Hardhat script, only.
 */
export const getEndTime = (seconds: number) => {
  // return moment()
  //   .add(seconds, "seconds")
  //   .startOf("hour")
  //   .utc()
  //   .unix();

  return moment()
    .add(seconds, "seconds")
    .utc()
    .unix();
};

export const emailTransError = async ({
  from,
  to,
  subject,
  reason,
  txid,
  signer
} : {
  from: string,
  to: string,
  subject: string,
  reason: string,
  txid: string,
  signer: string
}) => {
  try {
    const html = 
      `<h1>Transaction Error</h1><br />` +
      `<strong>Reason</strong>: ${reason}<br />` +
      `<strong>Txid</strong>: ${txid}<br />` +
      `<strong>Signer</strong>: ${signer}`;

    sgMail.setApiKey(`${process.env.SENDGRID_APIKEY}`);
    const [ result ] = await sgMail.send({
      from,
      to,
      subject,
      html
    });
    if (result.statusCode === 202) {
      const message = 
        `Send email successfully, reason=${reason}, txid=${txid}`;
      logI(message);  
    } else {
      const message = 
        `Failed to send email, ` +
        `reason=${reason} ` +
        `txid=${txid} ` +
        `code=${result.statusCode}, `+
        `message=${result.body}`;
      logE(message);
    }

  } catch (error) {
    const err: ResponseError = error as ResponseError;
    const message = 
      `Failed to send email, code=${err.code}, message=${err.message}`;
    logE(message);
  }
}
