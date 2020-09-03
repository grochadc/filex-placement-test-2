import { isWithinInterval } from "date-fns";
import db from "./db";

const generateCode = level => {
  let str = Math.random()
    .toString(36)
    .substring(7);
  return str.substr(0, 3) + level + str.substr(3);
};
function getNextItem(arr, el) {
  const index = arr.indexOf(el);
  if (index < 0) {
    throw new Error("Element is not in array");
  }
  let nextel;
  if (index === arr.length - 1) {
    nextel = arr[0];
  } else {
    nextel = arr[index + 1];
  }
  return nextel;
}

async function withinOpeningHours() {
  if (process.env.NODE_ENV === "development") {
    const openingHours = (await db.ref("openingHours").once("value")).val();
    const [openingStartHour, openingStartMinutes] = openingHours.start.split(
      ","
    );
    const [openingEndHour, openingEndMinutes] = openingHours.end.split(",");
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const startDate = new Date(
      year,
      month,
      day,
      openingStartHour,
      openingStartMinutes
    );
    const endDate = new Date(
      year,
      month,
      day,
      openingEndHour,
      openingEndMinutes
    );
    const disable = !isWithinInterval(new Date(), {
      start: startDate,
      end: endDate
    });
    return disable;
  } else {
    return false;
  }
}

export { generateCode, getNextItem, withinOpeningHours };
