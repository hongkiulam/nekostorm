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
