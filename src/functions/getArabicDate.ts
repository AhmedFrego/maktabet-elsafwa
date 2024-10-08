import { getArabicNumbers } from "./getArabicNumbers";

export const getArabicDate = (date: Date) => {
  const months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  const days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];

  return {
    hour: getArabicNumbers((date.getHours() > 12 ? +(date.getHours() - 12) : date.getHours()) + ":" + date.getMinutes()) || "",
    weekDay: days[date.getDay()] || "",
    day: getArabicNumbers(date.getDate()) || "",
    month: months[date.getMonth()] || "",
    year: getArabicNumbers(date.getFullYear()) || "",
  };
};
