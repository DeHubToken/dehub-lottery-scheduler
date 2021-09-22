const moment = require("moment");

/**
 * Get the next lottery 'endTime', based on current date, as UTC.
 * Used by 'start-lottery' Hardhat script, only.
 */
 export const getEndTime = (hours) => {
  // Get current date, as UTC.
  const now = moment().utc();

  // Get meridiem (AM/PM), based on current UTC Date.
  const meridiem = now.format("A");
  if (meridiem === "AM") {
    // We are in the morning (ante-meridiem), next lottery is at 06:00 AM.
    return moment(`${now.format("MM DD YYYY")} 06:00:00 +0000`, "MM DD YYYY HH:mm:ss Z", true)
      .add(hours, "hours")
      .startOf("hour")
      .utc()
      .unix();
  } else if (meridiem === "PM") {
    // We are in the afternoon (post-meridiem), next lottery is at 06:00 PM.
    return moment(`${now.format("MM DD YYYY")} 18:00:00 +0000`, "MM DD YYYY HH:mm:ss Z", true)
      .add(hours, "hours")
      .startOf("hour")
      .utc()
      .unix();
  }

  throw new Error("Could not determine next Lottery end time.");
};
