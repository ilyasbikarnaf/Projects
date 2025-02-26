/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Fragment, useId, useMemo, useRef, useState } from "react";
import { formatDate } from "../utils/formatDate";
import cc from "../utils/cc";
import { COLORS, useEvents } from "../context/useEvents";
import { UnionOmit } from "../utils/types";
import { Event } from "../context/Events";
import Modal, { ModalProps } from "./Modal";

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
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const { addEvent } = useEvents();

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
        <button
          className="add-event-btn"
          onClick={() => setIsNewEventModalOpen(true)}
        >
          +
        </button>
      </div>
      <EventFormModal
        date={day}
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
        onSubmit={addEvent}
      />
    </div>
  );
}

type EventFormModalProps = {
  onSubmit: (event: UnionOmit<Event, "id">) => void;
} & (
  | { onDelete: () => void; event: Event; date?: never }
  | { onDelete?: never; event?: never; date: Date }
) &
  Omit<ModalProps, "children">;

function EventFormModal({
  onSubmit,
  onDelete,
  event,
  date,
  ...modalProps
}: EventFormModalProps) {
  const [selectedColor, setSelectedColor] = useState(event?.color || COLORS[0]);
  const [isAllDayChecked, setIsAllDayChecked] = useState(
    event?.allDay || false
  );
  const [startTime, setStartTime] = useState(event?.startTime || "");
  const endTimeRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  
  const isNew = event == null;
  const formId = useId();

  return (
    <Modal {...modalProps}>
      <div className="modal-title">
        <div>{isNew ? "Add" : "Edit"} Event</div>
        <small>{formatDate(date || event.date, { dateStyle: "short" })}</small>
        <button className="close-btn" onClick={modalProps.onClose}>
          &times;
        </button>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor={`${formId}-name`}>Name</label>
          <input required type="text" id={`${formId}-name`} ref={nameRef} />
        </div>
        <div className="form-group checkbox">
          <input
            type="checkbox"
            name="all-day"
            id={`${formId}-all-day`}
            onChange={(e) => setIsAllDayChecked(e.target.checked)}
            checked={isAllDayChecked}
          />
          <label htmlFor={`${formId}-all-day`}>All Day?</label>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor={`${formId}-form-group`}>Start Time</label>
            <input
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required={!isAllDayChecked}
              disabled={isAllDayChecked}
              type="time"
              id={`${formId}-form-group`}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`${formId}-end-time`}>End Time</label>
            <input
              min={startTime}
              ref={endTimeRef}
              required={!isAllDayChecked}
              disabled={isAllDayChecked}
              type="time"
              id={`${formId}-end-time`}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Color</label>
          <div className="row left">
            {COLORS.map((color) => {
              return (
                <Fragment key={color}>
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    id={`${formId}-${color}`}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    className="color-radio"
                  />
                  <label htmlFor={`${formId}-${color}`}>
                    <span className="sr-only">color</span>
                  </label>
                </Fragment>
              );
            })}
          </div>
        </div>

        <div className="row">
          <button className="btn btn-success" type="submit">
            {isNew ? "Add" : "Edit"}
          </button>
          {onDelete != null && (
            <button className="btn btn-delete" onClick={onDelete} type="button">
              Delete
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
