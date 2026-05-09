import { useEffect, useState } from "react";
import "../../../Styles/MainPage/Timer.css";

const Timer: React.FC = () => {
    const getDate = (): string => {
        const now = new Date();

        const date = now.toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            year: "numeric",
        });
        const time = now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

        return `${date} | ${time}`;
    };

    const [date, setDate] = useState<string>(getDate());

    useEffect(() => {
        const update = () => setDate(getDate());
        const now = new Date();
        const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

        let intervalId: number | undefined;
        const timeoutId = window.setTimeout(() => {
            update();
            intervalId = window.setInterval(update, 60_000);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
            if (intervalId !== undefined) {
                clearInterval(intervalId);
            }
        };
    }, []);

    return (
        <div className="Timer_text">
            <h1>Today</h1>
                <b>
                    <div>{date}</div>
                </b>
        </div>
    );
};

export default Timer;