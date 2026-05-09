import { useEffect, useState } from 'react'
import "../../Styles/MultiUsedStyles/Calendar.css"

const DAYS = ["ma", "tu", "we", "th", "fr", "sa", "su"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

type DateCell = {
    date: number | null,
    dayOfWeek: number,
}

export default function Calendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const todayDate = today.getDate();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const [dateCells, setDateCells] = useState<DateCell[][]>([]);

    useEffect(() => {
        let firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
        firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

        const cells: DateCell[][] = [];
        let week: DateCell[] = [];

        for (let i = 0; i < firstDayOfWeek; i++) {
            week.push({ date: null, dayOfWeek: i });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayOfWeek = (firstDayOfWeek + (i - 1)) % 7;
            week.push({ date: i, dayOfWeek });

            if (dayOfWeek === 6) {
                cells.push(week);
                week = [];
            }
        }

        if (week.length > 0) {
            while (week.length < 7) {
                week.push({ date: null, dayOfWeek: week.length });
            }
            cells.push(week);
        }

        setDateCells(cells);
    }, [currentMonth, currentYear, daysInMonth]);

    return (
        <div className='calendar'>
            <b>{MONTHS[currentMonth]} {currentYear}</b>
            <div className='tableHeader'>
                {DAYS.map((day) => (
                    <div key={day} className="headerCell">
                        {day}
                    </div>
                ))}
            </div>
            <div className='weeksTable'>
                {dateCells.map((week, i) => (
                    <div key={i} className='weekRow'>
                        {week.map((cell, j) => (
                            <DateBlock key={j} cell={cell} todayDate={todayDate} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

type DateBlockProps = {
  cell: DateCell;
  todayDate: number;
}

const DateBlock = ({ cell, todayDate }: DateBlockProps) => {
  return (
    <div className='dateCell'style={{borderRadius: "10px",
      backgroundColor: cell.date === todayDate ? "orange" : "white"}}>
      {cell.date}
    </div>
  )
}