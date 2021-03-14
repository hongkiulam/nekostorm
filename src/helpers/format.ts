import type { Colors } from "../types/colors";

export const formatFileSize = (sizeInBytes: number) => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let counter = 0;
  let formatted = sizeInBytes;
  while (formatted > 1024) {
    formatted = formatted / 1024;
    counter++;
  }
  return formatted.toFixed(1) + units[counter];
};
export const capitalise = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

// from WebTorrent example
// Human readable bytes util
export const prettyBytes = (num: number) => {
  var exponent,
    unit,
    neg = num < 0,
    units = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (neg) num = -num;
  if (num < 1) return (neg ? "-" : "") + num + " B";
  exponent = Math.min(
    Math.floor(Math.log(num) / Math.log(1000)),
    units.length - 1
  );
  num = Number((num / Math.pow(1000, exponent)).toFixed(0));
  unit = units[exponent];
  return (neg ? "-" : "") + num + " " + unit;
};

export const formatTime = (timeInSeconds: number) => {
  let tIS = timeInSeconds;
  let humanised = [];
  let d, h, m, s;
  if (tIS / 86400 > 1) {
    d = Math.floor(tIS / 86400);
    tIS -= d * 86400;
    humanised.push(`${d}d `);
  }
  if (tIS / 3600 > 1) {
    h = Math.floor(tIS / 3600);
    tIS -= h * 3600;
    humanised.push(`${h}h `);
  }
  if (tIS / 60 > 1) {
    m = Math.floor(tIS / 60);
    tIS -= m * 60;
    humanised.push(`${m}m `);
  }
  s = Math.ceil(tIS);
  humanised.push(`${s}s`);
  return humanised[0] + (humanised[1] || "");
};

export const NaNGuard = (num: number) => {
  // useful when value is derived from division as x/0 or x/undefined is NaN
  return isNaN(num) ? 0 : num;
};

export const formatDate = (isoDate: string) => {
  return isoDate.slice(0, 10);
};

export const ratioToHealth = (
  ratio: number
): {
  color: Colors;
  label: string;
} => {
  if (ratio === 0) {
    return { color: "danger", label: "bad" };
  } else if (ratio === 1) {
    return { color: "warning", label: "medium" };
  } else if (ratio === 2) {
    return { color: "success", label: "good" };
  } else {
    return { color: "success", label: "excellent" };
  }
};
