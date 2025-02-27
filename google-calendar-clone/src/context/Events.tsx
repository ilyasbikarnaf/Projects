import { createContext, ReactNode, useContext, useState } from "react";
import { UnionOmit } from "../utils/types";
import { COLORS } from "./useEvents";

export type Event = {
  id: string;
  name: string;
  color: (typeof COLORS)[number];
  date: Date;
} & (
  | { allDay: true; startTime?: never; endTime?: never }
  | { allDay: false; startTime: string; endTime: string }
);

type EventsContext = {
  events: Event[];
  addEvent: (event: UnionOmit<Event, "id">) => void;
  updateEvent: (id: string, updatedEvent: UnionOmit<Event, "id">) => void;
  deleteEvent: (id: string) => void;
};

export const Context = createContext<EventsContext | null>(null);

type EventProviderProps = {
  children: ReactNode;
};

export function EventsProvider({ children }: EventProviderProps) {
  const [events, setEvents] = useState<Event[]>([]);

  function addEvent(event: UnionOmit<Event, "id">) {
    setEvents((e) => [...e, { ...event, id: crypto.randomUUID() }]);
  }

  function updateEvent(id: string, updatedEvent: UnionOmit<Event, "id">) {
    setEvents((e) =>
      e.map((event) => {
        return event.id === id ? { id, ...updatedEvent } : event;
      })
    );
  }

  function deleteEvent(id: string) {
    setEvents((e) => e.filter((event) => event.id !== id));
  }

  return (
    <Context.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </Context.Provider>
  );
}
