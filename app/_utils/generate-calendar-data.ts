const monthsAndDayStrings = {
  monthString: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  dayString: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

export default function generateCalendarDays({
  currentDay,
  highlightedList,
}: {
  currentDay: Date;
  highlightedList: { date: Date; hex: string; reason: string }[];
}) {
  const calendarDays = [];
  const firstDayOfMonth = new Date(
    currentDay.getFullYear(),
    currentDay.getMonth(),
    1
  );
  const weekdayOfFirstDay = firstDayOfMonth.getDay(); //from 0 - 6 i.e. Sunday to Saturday

  for (let day = 0; day < 42; day++) {
    // This conditional block updates the current state of the default firstDayOfMonth Value
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    const foundHighlighted = highlightedList.find(
      (highlighted) =>
        highlighted.date.getDate() === firstDayOfMonth.getDate() &&
        highlighted.date.getMonth() === firstDayOfMonth.getMonth() &&
        highlighted.date.getFullYear() === firstDayOfMonth.getFullYear()
    );

    let calendarDay = {
      month: firstDayOfMonth.getMonth(),
      day: firstDayOfMonth.getDate(),
      weekday: monthsAndDayStrings.dayString[firstDayOfMonth.getDay()],
      year: firstDayOfMonth.getFullYear(),
      currentMonth:
        firstDayOfMonth.getMonth() === currentDay.getMonth() ? true : false,
      selection:
        firstDayOfMonth.getDate() === currentDay.getDate() ? true : false,
      highlight: {
        isHighlighted: Boolean(foundHighlighted?.date),
        highlightColor: foundHighlighted?.hex ?? "#A8DF8E",
        highlightReason: foundHighlighted?.reason ?? "Available",
      },
    };
    calendarDays.push(calendarDay);
  }
  return calendarDays;
}
