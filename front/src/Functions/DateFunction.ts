const Months = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

export function DateSlug(structure: Date) {
  let date = structure.getDate();
  let month = Months[structure.getMonth()];
  let year = structure.getFullYear() + 543;

  let finalDate = `${date} ${month} ${year}`;

  return finalDate;
}
