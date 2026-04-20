import { useEffect, useState } from "react";
import "./style/Timer.css";
const Timer: React.FC = () => {
    const getDate = (): string => {
    const now = new Date();

    const dateParts  = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        day: "2-digit",
        year: "numeric",
    }).formatToParts(new Date());
    const weekday = dateParts.find(p=>p.type === "weekday")?.value;
    const day = dateParts.find(p=>p.type === "day")?.value;
    const year = dateParts.find(p=>p.type === "year")?.value;
    const timeParts  = new Intl.DateTimeFormat("en-US",{
         hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(now);
    return `${weekday} ${day}, ${year} | ${timeParts}`;
};
const [date, setDate] = useState<string>(getDate());
useEffect(()=>{
    setDate(getDate());

    const now = new Date();
    const goToNextMin = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const timeout  = setTimeout(()=>{
        setDate(getDate());
        const interval = setInterval(()=>{
        setDate(getDate());
    }, 60_000);
    return () => clearInterval(interval);
    }, goToNextMin);
    return () => clearTimeout(timeout);
},[]);
    return(<>
    <div className="Timer">
        <div className="Timer_text">
        <h1 >Today</h1>
        <b><div>{date}</div></b>
        </div>
    </div>
        </>
    );
};
export default Timer;