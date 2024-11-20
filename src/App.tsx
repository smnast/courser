import React from "react";
import styles from "./App.module.css";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import CourseInput from "@/components/CourseInput";
import CourseRow from "@/components/CourseRow";
import CombinationInput from "@/components/CombinationInput";
import { useCourses } from "@/hooks/useCourses";
import TitleBar from "./components/TitleBar";

const App = () => {
    const {
        loadedCourses,
        courses,
        combinationInputs,
        courseColors,
        addCourse,
        removeCourse,
        handleCombinationChange,
        handleGlobalCombinationChange,
    } = useCourses();

    return (
        <div className={styles.layout}>
            <TitleBar />

            <div className={styles.app}>
                <div className={styles["course-info"]}>
                    <div className={styles["course-input"]}>
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
                    </div>

                    {/* Combination inputs for each Course */}
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

                    {/* Course list */}
                    <div className={styles["course-list"]}>
                        {courses.map((course, index) => (
                            <div key={index}>{course.toString()}</div>
                        ))}
                    </div>

                    <CombinationInput
                        onLeftClick={() => handleGlobalCombinationChange(-1)}
                        onRightClick={() => handleGlobalCombinationChange(1)}
                    />
                </div>

                <div className={styles["course-calendar"]}>
                    {/* Render the calendar with selected courses */}
                    <WeeklyCalendar courses={courses} courseColors={courseColors} />
                </div>
            </div>
        </div>
    );
};

export default App;
