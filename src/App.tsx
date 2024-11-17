import React from "react";
import styles from "./App.module.css";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import CourseInput from "@/components/CourseInput";
import CourseRow from "@/components/CourseRow";
import CombinationInput from "@/components/CombinationInput";
import { useCourses } from "@/hooks/useCourses";

const App = () => {
    const {
        loadedCourses,
        courses,
        combinationInputs,
        hasConflicts,
        addCourse,
        removeCourse,
        handleCombinationChange,
        handleGlobalCombinationChange,
    } = useCourses();

    return (
        <div className={styles.app}>
            <h1>
                Courser (<i>Very Pre</i>-release)
            </h1>

            {/* Course input */}
            <CourseInput
                onAdd={async (courseName) => {
                    try {
                        await addCourse(courseName);
                    } catch (error) {
                        alert(
                            error instanceof Error
                                ? error.message
                                : "An unknown error occurred"
                        );
                    }
                }}
            />

            {/* Inputs for each Course */}
            {loadedCourses.map((course, index) => (
                <CourseRow
                    key={index}
                    course={course}
                    combinationIndex={combinationInputs[course.name] || 0}
                    onCombinationChange={(value) =>
                        handleCombinationChange(course, value)
                    }
                    onRemove={() => removeCourse(course.name)}
                />
            ))}

            <CombinationInput
                onLeftClick={() => handleGlobalCombinationChange(-1)}
                onRightClick={() => handleGlobalCombinationChange(1)}
            />

            {/* Render the calendar with selected courses */}
            <WeeklyCalendar courses={courses} />

            {/* Course list */}
            <div className={styles.courseList}>
                {courses.map((course, index) => (
                    <div key={index}>{course.toString()}</div>
                ))}
            </div>
        </div>
    );
};

export default App;
