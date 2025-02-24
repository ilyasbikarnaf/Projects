import {
  addMonths,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  isBefore,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useMemo, useState } from "react";
import { formatDate } from "../utils/formatDate";
import cc from "./cc";

export default function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(selectedMonth)),
      end: endOfWeek(endOfMonth(selectedMonth)),
    });
  }, [selectedMonth]);

  return (
    <div className="calendar">
      <div className="header">
        <button className="btn" onClick={() => setSelectedMonth(new Date())}>
          Today
        </button>
        <div>
          <button
            className="month-change-btn"
            onClick={() => setSelectedMonth((m) => subMonths(m, 1))}
          >
            &lt;
          </button>
          <button
            className="month-change-btn"
            onClick={() => setSelectedMonth((m) => addMonths(m, 1))}
          >
            &gt;
          </button>
        </div>
        <span className="month-title">
          {formatDate(selectedMonth, { month: "long", year: "numeric" })}
        </span>
      </div>
      <div className="days">
        {days.map((day, idx) => {
          return (
            <CalendarDay
              key={day.getTime()}
              day={day}
              selectedMonth={selectedMonth}
              showWeekName={idx <= 6}
            />
          );
        })}
      </div>
    </div>
  );
}

type CalendarDateProps = {
  day: Date;
  selectedMonth: Date;
  showWeekName: boolean;
};

function CalendarDay({ day, selectedMonth, showWeekName }: CalendarDateProps) {
  return (
    <div
      className={cc(
        "day",
        isBefore(endOfDay(day), new Date()) && "old-month-day",
        !isSameMonth(selectedMonth, day) && "non-month-day"
      )}
    >
      <div className="day-header">
        {showWeekName && (
          <div className="week-name">
            {formatDate(day, { weekday: "short" })}
          </div>
        )}
        <div className={cc("day-number", isToday(day) && "today")}>
          {formatDate(day, { day: "numeric" })}
        </div>
        <button className="add-event-btn">+</button>
      </div>
      {/* <div className="events">
            <button className="all-day-event blue event">
              <div className="event-name">Short</div>
            </button>
            <button className="all-day-event green event">
              <div className="event-name">
                Long Event Name That Just Keeps Going
              </div>
            </button>
            <button className="event">
              <div className="color-dot blue"></div>
              <div className="event-time">7am</div>
              <div className="event-name">Event Name</div>
            </button>
          </div> */}
    </div>
  );
}
