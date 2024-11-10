import React from "react";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import Course from "@/helpers/course/Course";
import Section from "@/helpers/course/Section";
import SectionType from "@/helpers/course/SectionType";
import TimeSlot from "@/helpers/course/TimeSlot";
import WeekDay from "@/helpers/course/WeekDay";
import Campus from "@/helpers/course/Campus";
import styles from "./App.module.css";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

const App = () => {
    // Extend dayjs with plugins
    dayjs.extend(timezone);
    dayjs.extend(utc);

    const courses = [
        new Course("Math 101", [
            new Section("D100", SectionType.Lab, [
                new TimeSlot(
                    Campus.Burnaby,
                    [WeekDay.Monday, WeekDay.Thursday],
                    dayjs().tz("America/Vancouver").hour(9).minute(30),
                    dayjs().tz("America/Vancouver").hour(23).minute(20),
                    new Date("Jan 1, 2024"),
                    new Date("Apr 30, 2024"),
                    false
                ),
            ]),
        ]),
    ];

    return (
        <div className={styles.app}>
            <WeeklyCalendar courses={courses} />
        </div>
    );
};

export default App;
