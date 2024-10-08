export const getArabicNumbers = (str: string | number) => {
  var r = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

  if (typeof str === "number") {
    return str.toString().replace(/[0-9]/g, function (w) {
      return r[+w];
    });
  }

  if (typeof str === "string") {
    return str.replace(/[0-9]/g, function (w) {
      return r[+w];
    });
  }
};
