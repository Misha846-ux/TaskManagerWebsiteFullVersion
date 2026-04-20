import React, { useEffect, useState } from 'react'
import "./Styles/Calendar.css"
import DateCell from './DateCell'
import type { dateCellType } from './Types/DateCellType'
import { current } from '@reduxjs/toolkit';



export default function Calendar() {
  const days = ["ma", "tu", "we", "th", "fr", "sa", "su"];
  const [dateCells, SetdateCells] = useState<dateCellType[][]>([]);
  const [todayDate, setToday] = useState<number>(new Date().getDate());


  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth(); 
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    
    let firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

    
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const cells: dateCellType[][] = [];
    let week: dateCellType[] = [];

    const timer = setInterval(() => { // тут отслеживаем сегодняшнюю дату
      setToday(new Date().getDate()); 
    }, 500);

    for (let i = 0; i < firstDayOfWeek; i++) {
      week.push({ date: null, dayOfWeek: i, activeCheking: false });
    }

    
    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = (firstDayOfWeek + (i - 1)) % 7;

      week.push({ date: i, dayOfWeek, activeCheking: false });

      if (dayOfWeek === 6) {
        cells.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push({ date: null, dayOfWeek: week.length, activeCheking: false });
      }
      cells.push(week);
    }

    SetdateCells(cells);

    return () => clearInterval(timer);
  }, []);


  return (
    <div className='calendar'>
        <b>April</b>
        <div className='tableHeader'>
            {days.map((day) => (
            <div key={day} className="headerCell">
              {day}
            </div>
          ))}
        </div>
        <div className='weeksTable'>
          {dateCells.map((week, i) => (
          <div key={i} className='weekRow'>
            {week.map((cell, j) => (
              <DateCell key={j} day={cell} today={todayDate}/>
            ))}
          </div>
        ))}
          
        </div>
        
    </div>
  )
}
