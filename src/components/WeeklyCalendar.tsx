import React from "react";
import Course from "@/helpers/course/Course";
import { weekDayToIndex } from "@/helpers/course/WeekDay";
import { HSLColor } from "@/types/color";
import "./WeeklyCalendar.css";

/**
 * @interface WeeklyCalendarProps
 * @description Defines the props for the WeeklyCalendar component.
 * @property {Course[]} courses - The list of courses to display on the calendar.
 * @property {{[key: string]: HSLColor}} courseColors - A mapping of course names to their assigned color.
 */
interface WeeklyCalendarProps {
    courses: Course[];
    courseColors: { [key: string]: HSLColor };
}

/**
 * WeeklyCalendar component that renders a calendar with course events.
 *
 * @param {WeeklyCalendarProps} props - The props passed to the component.
 * @returns {JSX.Element} The rendered JSX element for the weekly calendar.
 */
const WeeklyCalendar = ({
    courses,
    courseColors,
}: WeeklyCalendarProps): JSX.Element => {
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

    /**
     * Checks for conflicting courses in the given list of courses.
     *
     * Iterates through each course and checks if it overlaps with any other course in the list.
     *
     * @param courses - An array of course objects to be checked for conflicts.
     * @returns An array of booleans where each element indicates whether the corresponding course has a conflict.
     */
    const conflicting = courses.map((course, index) => {
        return courses.some((otherCourse, otherIndex) => {
            if (index !== otherIndex) {
                return course.overlaps(otherCourse);
            }
            return false;
        });
    });

    // Grid settings
    const slotsPerHour = 6;
    const minutesPerSlot = 60 / slotsPerHour;
    const hourOffset = 1;
    const headerOffset = 6;

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
                const rowStart = rowIndex * slotsPerHour + 1 + headerOffset;
                return (
                    <React.Fragment key={hour}>
                        <div
                            className="hour-label"
                            style={{
                                gridRow: `${rowStart} / span ${slotsPerHour}`,
                                gridColumn: hourOffset,
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
                                    gridColumn: dayIndex + 1 + hourOffset,
                                }}
                            />
                        ))}
                    </React.Fragment>
                );
            })}

            {/* Course Events */}
            {courses.map((course, index) =>
                course.sections.flatMap((section) =>
                    section.timeSlots.flatMap((timeSlot) => {
                        const rowStart =
                            timeSlot.startTime.hour() * slotsPerHour +
                            timeSlot.startTime.minute() / minutesPerSlot +
                            1 +
                            headerOffset;
                        const duration = timeSlot.endTime.diff(
                            timeSlot.startTime,
                            "minute"
                        );
                        const durationInSlots = duration / minutesPerSlot;

                        return timeSlot.days.map((weekDay) => (
                            <div
                                className={
                                    "event" +
                                    (conflicting[index] ? " conflicting" : "")
                                }
                                key={`${course.name}-${section.name}-${timeSlot.startTime}-${weekDay}`}
                                style={{
                                    backgroundColor: courseColors[course.name],
                                    gridRow: `${rowStart} / span ${durationInSlots}`,
                                    gridColumn:
                                        weekDayToIndex(weekDay) +
                                        1 +
                                        hourOffset,
                                }}
                            >
                                {course.name} {section.name}
                            </div>
                        ));
                    })
                )
            )}
        </div>
    );
};

export default WeeklyCalendar;
