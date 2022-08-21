const dayNameInID = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
const monthNameInID = ["Januari", "Pebruari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

// Export from MYD format
export const dateFormat = (date) => {
  const createDate = new Date(date)

  return {
    origin: createDate,
    date: createDate.getDate(),
    month: createDate.getMonth(),
    dayName: dayNameInID[createDate.getDay()],
    dayNameShort: dayNameInID[createDate.getDay()]?.slice(0, 3),
    monthName: monthNameInID[createDate.getMonth()],
    year: createDate.getFullYear(),
    dmy: createDate.toLocaleDateString(),
    full: `${dayNameInID[createDate.getDay()]}, ${createDate.getDate()} ${monthNameInID[createDate.getMonth()]} ${createDate.getFullYear()}`,
  }
}
