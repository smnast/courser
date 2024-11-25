import React, { useEffect, useState } from "react";
import Course from "@/helpers/course/Course";
import { HSLColor } from "@/types/color";
import styles from "./CourseInfo.module.css";
import Section from "@/helpers/course/Section";
import TimeSlot from "@/helpers/course/TimeSlot";

// TypeScript interfaces
interface CourseInfoProps {
    courses: Course[];
    courseColors: { [key: string]: HSLColor };
    combinationInputs: { [key: string]: number };
    removeCourse: (courseName: string) => void;
    handleCombinationChange: (courseName: string, value: number) => void;
}

const CourseInfo = ({
    courses,
    courseColors,
    combinationInputs,
    removeCourse,
    handleCombinationChange,
}: CourseInfoProps) => {
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

    const toggleExpanded = (courseName: string) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [courseName]: !prevExpanded[courseName],
        }));
    };

    useEffect(() => {
        const initialExpanded: { [key: string]: boolean } = {};
        courses.forEach((course) => {
            initialExpanded[course.name] = expanded[course.name] || false;
        });
        setExpanded(initialExpanded);
    }, [courses]);

    return (
        <div className={styles["course-info"]}>
            {courses.map((course: Course) => (
                <CourseBox
                    key={course.name}
                    course={course}
                    color={courseColors[course.name]}
                    expanded={expanded[course.name]}
                    combination={combinationInputs[course.name]}
                    toggleExpanded={toggleExpanded}
                    removeCourse={removeCourse}
                    handleCombinationChange={handleCombinationChange}
                />
            ))}
        </div>
    );
};

// CourseBox Component
const CourseBox = ({
    course,
    color,
    expanded,
    combination,
    toggleExpanded,
    removeCourse,
    handleCombinationChange,
}: {
    course: Course;
    color: HSLColor;
    expanded: boolean;
    combination: number;
    toggleExpanded: (courseName: string) => void;
    removeCourse: (courseName: string) => void;
    handleCombinationChange: (courseName: string, value: number) => void;
}) => {
    return (
        <div
            className={styles["course-box"]}
            style={{ backgroundColor: color }}
        >
            <div
                className={styles.title}
                onClick={() => toggleExpanded(course.name)}
            >
                {course.name}
                <div className={styles["title-input"]}>
                    <input
                        className={styles["combination-input"]}
                        type="number"
                        value={combination}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value)) {
                                handleCombinationChange(course.name, value);
                            }
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        className={styles["remove-button"]}
                        onClick={() => {
                            removeCourse(course.name);
                        }}
                    >
                        Remove
                    </button>
                </div>
            </div>

            {expanded && <CourseDescription course={course} />}
        </div>
    );
};

// CourseDescription Component
const CourseDescription = ({ course }: { course: Course }) => {
    return (
        <div className={styles.description}>
            <SectionList sections={course.sections} />
        </div>
    );
};

// SectionList Component
const SectionList = ({ sections }: { sections: Section[] }) => {
    return (
        <div className={styles["sections-list"]}>
            {sections.map((section, index) => (
                <React.Fragment key={index}>
                    <SectionItem section={section} />
                    {index < sections.length - 1 && <hr />}
                </React.Fragment>
            ))}
        </div>
    );
};

// SectionItem Component
const SectionItem = ({ section }: { section: Section }) => {
    return (
        <div>
            <b>{section.getNameString()}</b>
            <br />
            {section.getInstructorString()}
            <TimeSlotList timeSlots={section.timeSlots} />
        </div>
    );
};

// TimeSlotList Component
const TimeSlotList = ({ timeSlots }: { timeSlots: TimeSlot[] }) => {
    return (
        <div>
            {timeSlots.map((timeSlot, index) => (
                <TimeSlotItem key={index} timeSlot={timeSlot} />
            ))}
        </div>
    );
};

// TimeSlotItem Component
const TimeSlotItem = ({ timeSlot }: { timeSlot: TimeSlot }) => {
    return (
        <div className={styles["time-slot"]}>
            <span>{timeSlot.getDaysString()}</span>
            <br />
            <span>{timeSlot.getTimesString()}</span>
        </div>
    );
};

export default CourseInfo;
