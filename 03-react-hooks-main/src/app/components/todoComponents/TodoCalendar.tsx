// components/TodoCalendar.tsx
'use client';
import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useTheme } from '../../context/ThemeContext';
import { Todo } from './TodoApp';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    'en-US': enUS,
  },
});

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  completed: boolean;
}

interface TodoCalendarProps {
  todos: Todo[];
}

export default function TodoCalendar({ todos }: TodoCalendarProps) {
  const { theme } = useTheme();
  const [date, setDate] = useState(new Date());

  const events: CalendarEvent[] = todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    start: todo.dueDate ? new Date(todo.dueDate) : new Date(),
    end: todo.dueDate ? new Date(todo.dueDate) : new Date(),
    allDay: true,
    completed: todo.completed,
  }));

  const eventStyleGetter = (event: CalendarEvent) => {
    const backgroundColor = event.completed ? '#10B981' : '#3B82F6';
    const style = {
      backgroundColor,
      borderRadius: '4px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return { style };
  };

  return (
    <div
      className={`h-[500px] p-4 rounded-lg ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
      }`}
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        date={date}
        onNavigate={setDate}
        eventPropGetter={eventStyleGetter}
        className={theme === 'dark' ? 'dark-calendar' : ''}
      />
    </div>
  );
}
