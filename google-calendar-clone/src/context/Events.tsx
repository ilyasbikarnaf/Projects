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
  | { allDay: false; startTime: Date; endTime: Date }
);

type EventsContext = {
  events: Event[];
  addEvent: (event: UnionOmit<Event, "id">) => void;
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

  return (
    <Context.Provider value={{ events, addEvent }}>{children}</Context.Provider>
  );
}
