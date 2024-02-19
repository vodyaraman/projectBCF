import React, { useRef, useState, useEffect } from 'react';
import "../../pages/main-page/Main-page.css";
import ClipboardJS from 'clipboard';

const Calendar = ({ selectedDate }) => {
    const [date, setDate] = useState(new Date());
    const copyRef = useRef(null);

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // Изменил порядок, начиная с понедельника
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const prevMonth = () => {
        setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    const daysInMonth = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        let firstDay = new Date(year, month, 1).getDay() - 1;
        if (firstDay === -1) firstDay = 6;
        return firstDay;
    };

    const renderDays = () => {
        const days = [];
        const totalDays = daysInMonth();
        const firstDay = firstDayOfMonth();

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty${i}`} className="empty"></div>);
        }

        for (let i = 1; i <= totalDays; i++) {
            const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
            const selectedDateParts = selectedDate.split(' ');
            const datePart = selectedDateParts[0];
            const [day, month, year] = datePart.split('.');

            const selectedDateObject = new Date(year, month - 1, day);
            const isSelected = currentDate.toDateString() === selectedDateObject.toDateString();
            console.log(currentDate, "\n", selectedDateObject, "\n", isSelected);
            days.push(
                <div
                    key={i}
                    className={isSelected ? 'selected-day' : 'day'}
                    onClick={() => handleDateClick(currentDate)}
                >
                    {i}
                </div>
            );
        }
        return days;
    };

    useEffect(() => {
        const clipboard = new ClipboardJS(copyRef.current, {
            text: () => selectedDate
        });

        clipboard.on('success', (e) => {
            e.clearSelection();
            copyRef.current.innerText = 'Скопировано';
            copyRef.current.style.color = 'green';
        });

        return () => clipboard.destroy();
    }, [selectedDate]);

    const handleDateClick = (clickedDate) => {
        setDate(clickedDate);
    };

    return (
        <div className="structure-block-calendar">
            <div className="calendar-buttons">
                <button className="calendar-button" onClick={prevMonth}>Prev</button>
                <h1>{monthsOfYear[date.getMonth()]} {date.getFullYear()}</h1>
                <button className="calendar-button" onClick={nextMonth}>Next</button>
            </div>
            <div className="days">
                {daysOfWeek.map(day => (
                    <div key={day} className="day-of-week">{day}</div>
                ))}
                {renderDays()}
            </div>
            <div id="copy-date" ref={copyRef} onClick={()=> copyRef.current.click()}>
                copy publication date
            </div>
        </div>
    );
};

export default Calendar;








