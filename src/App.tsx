import React from "react";
import styles from "./App.module.css";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import CourseInput from "@/components/CourseInput";
import CourseInfo from "@/components/CourseInfo";
import CombinationInput from "@/components/CombinationInput";
import { useCourses } from "@/hooks/useCourses";
import TitleBar from "./components/TitleBar";

const App = () => {
    const {
        courses,
        combinationInputs,
        courseColors,
        isLoadingCourse,
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
                        {isLoadingCourse && <div>Loading...</div>}
                    </div>

                    <CourseInfo
                        courses={courses}
                        courseColors={courseColors}
                        combinationInputs={combinationInputs}
                        removeCourse={removeCourse}
                        handleCombinationChange={handleCombinationChange}
                    />
                </div>

                <div className={styles["course-calendar"]}>
                    <CombinationInput
                        onLeftClick={() => handleGlobalCombinationChange(-1)}
                        onRightClick={() => handleGlobalCombinationChange(1)}
                    />

                    {/* Render the calendar with selected courses */}
                    <WeeklyCalendar
                        courses={courses}
                        courseColors={courseColors}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
