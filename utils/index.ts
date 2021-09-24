import moment from "moment";

/**
 * Get the next lottery 'endTime', based on current date, as UTC.
 * Used by 'start-lottery' Hardhat script, only.
 */
export const getEndTime = (seconds: number) => {
  return moment()
    .add(seconds, "seconds")
    .startOf("hour")
    .utc()
    .unix();

  // return moment()
  //   .add(seconds, "seconds")
  //   .utc()
  //   .unix();
};
