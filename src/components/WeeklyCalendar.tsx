import React from "react";
import Course from "@/helpers/course/Course";
import { weekDayToIndex } from "@/helpers/course/WeekDay";
import "./WeeklyCalendar.css";

/**
 * @interface WeeklyCalendarProps
 * @description Defines the props for the WeeklyCalendar component.
 * @property {Course[]} courses - The list of courses to display on the calendar.
 */
interface WeeklyCalendarProps {
    courses: Course[];
}

/**
 * WeeklyCalendar component that renders a calendar with course events.
 *
 * @param {WeeklyCalendarProps} props - The props passed to the component.
 * @returns {JSX.Element} The rendered JSX element for the weekly calendar.
 */
const WeeklyCalendar = ({ courses }: WeeklyCalendarProps): JSX.Element => {
    // Define the days of the week and the hours
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    /**
     * Generates the hour labels for the calendar.
     * @returns {string[]} An array of strings representing the hours in a 12-hour format.
     */
    const hours = Array.from({ length: 24 }, (_, i) => {
        const hour = i % 12 === 0 ? 12 : i % 12;
        const period = i < 12 ? "AM" : "PM";
        return `${hour}:00 ${period}`;
    });

    // Grid settings
    const slotsPerHour = 6;
    const minutesPerSlot = 60 / slotsPerHour;

    return (
        <div className="calendar">
            {/* Days of the Week Header */}
            <div className="day-header" />
            {daysOfWeek.map((day) => (
                <div className="day-header" key={day}>
                    {day}
                </div>
            ))}

            {/* Hour Rows */}
            {hours.map((hour, rowIndex) => {
                const rowStart = rowIndex * slotsPerHour + 2;
                return (
                    <React.Fragment key={hour}>
                        <div
                            className="hour-label"
                            style={{
                                gridRow: `${rowStart} / span ${slotsPerHour}`,
                                gridColumn: 1,
                            }}
                        >
                            {hour}
                        </div>
                        {daysOfWeek.map((_, dayIndex) => (
                            <div
                                className="time-slot"
                                key={dayIndex}
                                style={{
                                    gridRow: `${rowStart} / span ${slotsPerHour}`,
                                    gridColumn: dayIndex + 2,
                                }}
                            />
                        ))}
                    </React.Fragment>
                );
            })}

            {/* Course Events */}
            {courses.flatMap((course) =>
                course.sections.flatMap((section) =>
                    section.timeSlots.flatMap((timeSlot) => {
                        const rowStart =
                            timeSlot.startTime.hour() * slotsPerHour +
                            timeSlot.startTime.minute() / minutesPerSlot +
                            2;
                        const duration = timeSlot.endTime.diff(
                            timeSlot.startTime,
                            "minute"
                        );
                        const durationInSlots = duration / minutesPerSlot;

                        return timeSlot.days.map((weekDay) => (
                            <div
                                className={`event`}
                                key={`${course.name}-${section.name}-${timeSlot.startTime}-${weekDay}`}
                                style={{
                                    gridRow: `${rowStart} / span ${durationInSlots}`,
                                    gridColumn: weekDayToIndex(weekDay) + 2,
                                }}
                            >
                                {course.name}
                            </div>
                        ));
                    })
                )
            )}
        </div>
    );
};

export default WeeklyCalendar;
