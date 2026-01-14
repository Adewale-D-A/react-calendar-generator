"use client";
import { useEffect, useState } from "react";
import generateCalendarDays from "../_utils/generate-calendar-data";
import monthsAndDayStrings from "../_assets/dasy-months-string.json";

export default function RenderCalendarView({
  defaultCurrentDate,
  highlightedList = [],
}: {
  defaultCurrentDate?: Date;
  highlightedList: { date: Date; hex: string; reason: string }[];
}) {
  const [currentDay, setCurrentDay] = useState(
    defaultCurrentDate ?? new Date()
  );
  const [generatedDays, setGeneratedDays] = useState<
    {
      month: number;
      day: number;
      weekday: string;
      year: number;
      currentMonth: boolean;
      selection: boolean;
      highlight: {
        isHighlighted: boolean;
        highlightColor: string;
        highlightReason: string;
      };
    }[]
  >([]);

  useEffect(() => {
    const generatedDays = generateCalendarDays({ currentDay, highlightedList });
    setGeneratedDays(generatedDays);
  }, [currentDay, highlightedList]);

  const showNextMonth = () => {
    setCurrentDay(
      new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 1)
    );
  };
  const showPreviousMonth = () => {
    setCurrentDay(
      new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, 1)
    );
  };
  return (
    <div className=" w-full space-y-5">
      <h1 className=" text-center font-bold text-2xl">Calendar View</h1>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex justify-between items-center">
          <button onClick={showPreviousMonth}> {"<"} Previous Month</button>
          <p>
            {monthsAndDayStrings.month_string[currentDay.getMonth()]}{" "}
            {currentDay.getFullYear()}
          </p>
          <button onClick={showNextMonth}>Next Month {">"}</button>
        </div>
        <div className=" space-y-2.5">
          <div className="w-full grid grid-cols-7 gap-2 text-gray-500">
            {monthsAndDayStrings.day_string.map((day, index) => {
              return (
                <div key={index} className=" text-sm text-center">
                  <span>{day}</span>
                </div>
              );
            })}
          </div>
          <div className="w-full grid grid-cols-7 gap-2 text-gray-500">
            {generatedDays.map((day, index) => {
              return (
                <button
                  type="button"
                  key={index}
                  title={day?.highlight.highlightReason}
                  style={{
                    backgroundColor: day.currentMonth
                      ? day.highlight.highlightColor
                      : "#d9d7d7",
                  }}
                  className={
                    "text-shadow text-black rounded-md py-1" +
                    (day.highlight.isHighlighted ? " text-white" : "") +
                    (day.currentMonth ? "" : " text-gray-400")
                  }
                >
                  {day.day}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
