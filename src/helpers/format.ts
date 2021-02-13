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
