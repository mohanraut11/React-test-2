'use client';
import { useState } from 'react';
import { Calendar, dateFnsLocalizer, ToolbarProps } from 'react-big-calendar';
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

const CustomToolbar = ({ label, onView, views, view, onNavigate }: ToolbarProps) => {
  return (
    <div className="flex justify-between items-center p-2 mb-2">
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 rounded-md bg-[#1877f2] text-white hover:bg-blue-700"
          onClick={() => onNavigate('PREV')}
        >
          ‹
        </button>
        <span className="font-semibold text-lg">{label}</span>
        <button
          className="px-3 py-1 rounded-md bg-[#1877f2] text-white hover:bg-blue-700"
          onClick={() => onNavigate('NEXT')}
        >
          ›
        </button>
      </div>
      <div className="flex items-center gap-2">
        {views.map((v) => (
          <button
            key={v}
            className={`px-3 py-1 rounded-md font-medium ${
              v === view
                ? 'bg-[#1877f2] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => onView(v)}
          >
            {v[0].toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function TodoCalendar({ todos }: TodoCalendarProps) {
  const { theme } = useTheme();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month'); // Track the view

  const events: CalendarEvent[] = todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    start: todo.dueDate ? new Date(todo.dueDate) : new Date(),
    end: todo.dueDate ? new Date(todo.dueDate) : new Date(),
    allDay: true,
    completed: todo.completed,
  }));

  const eventStyleGetter = (event: CalendarEvent) => {
    const backgroundColor = event.completed ? '#10B981' : '#1877f2';
    return {
      style: {
        backgroundColor,
        borderRadius: '8px',
        opacity: 0.9,
        color: 'white',
        fontWeight: '500',
        padding: '4px 8px',
        border: 'none',
        display: 'block',
      },
    };
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    setDate(date);
    setView('day');  // Change to 'day' view on date click
  };

  return (
    <div
      className={`rounded-2xl shadow-md overflow-hidden transition-all ${
        theme === 'dark' ? 'bg-[#1c1e21] text-gray-100' : 'bg-white text-gray-800'
      }`}
    >
      <div className="p-4 border-b border-gray-300 dark:border-gray-600">
        <h2 className="text-xl font-semibold">Calendar View</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Plan and track todos by date
        </p>
      </div>
      <div className="h-[550px] px-4 py-2">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={date}
          onNavigate={setDate}  // Handle navigation correctly
          onSelectSlot={({ start }) => handleDateClick(start)}  // Handle date click
          view={view}  // Set view dynamically
          onView={setView}  // Set view dynamically on toolbar change
          eventPropGetter={eventStyleGetter}
          components={{
            toolbar: CustomToolbar,
          }}
          views={['month', 'week', 'day']}
        />
      </div>
    </div>
  );
}
