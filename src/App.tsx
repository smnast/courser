import React, { useState } from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import styles from "./App.module.css";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import { loadCourse } from "@/helpers/API/load";
import Course from "@/helpers/course/Course";

const App = () => {
    dayjs.extend(timezone);
    dayjs.extend(utc);
    dayjs.extend(customParseFormat);

    const [loadedCourses, setLoadedCourses] = useState<Course[]>([]); // State to track loaded courses
    const [courses, setCourses] = useState<Course[]>([]); // State to track courses
    const [courseInput, setCourseInput] = useState<string>(""); // Track course name input
    const [combinationInputs, setCombinationInputs] = useState<{
        [key: string]: number;
    }>({}); // Combination index for each course

    // Handle course input change
    const handleCourseInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCourseInput(event.target.value);
    };

    // Handle combination index change for a specific course
    const handleCombinationChange = (course: Course, value: number) => {
        if (value < 0) {
            value = 0;
        } else if (value >= course.numCombinations()) {
            value = course.numCombinations() - 1;
        }

        // Update the combination index for the specific course
        setCombinationInputs((prev) => {
            const updatedCombinations = { ...prev, [course.name]: value };
            updateCourseCombination(
                course.name,
                updatedCombinations[course.name]
            );
            return updatedCombinations;
        });
    };

    // Update the course combination based on the selected index
    const updateCourseCombination = (
        courseName: string,
        combinationIndex: number
    ) => {
        // Update the course with the new combination index
        setCourses((prevCourses) => {
            return prevCourses.map((course, index) => {
                if (course.name === courseName) {
                    const updatedCourse =
                        loadedCourses[index].getCombination(combinationIndex);
                    return updatedCourse;
                }
                return course;
            });
        });
    };

    // Add course to the state
    const handleAddCourse = async () => {
        const courseName = courseInput.toUpperCase();
        if (
            courseInput &&
            !courses.some((course) => course.name === courseName)
        ) {
            // Fetch the course data with the selected name
            const [department, courseNumber] = courseName.split(" ");
            const loadedCourse = await loadCourse(
                "2025",
                "spring",
                department,
                courseNumber
            );

            if (loadedCourse) {
                // Add course with its selected combination to the state
                setLoadedCourses((prev) => [...prev, loadedCourse]);
                setCourses((prev) => [...prev, loadedCourse.getCombination(0)]);
                setCourseInput(""); // Clear input field after adding
            } else {
                alert("Error loading course!");
            }
        }
    };

    return (
        <div className={styles.app}>
            <h1>
                Courser (<i>Very Pre</i>-release)
            </h1>

            {/* Course Input */}
            <input
                type="text"
                value={courseInput}
                onChange={handleCourseInputChange}
                placeholder="Enter Course Name (e.g., CMPT 120)"
            />
            <button onClick={handleAddCourse}>Add Course</button>

            {/* Inputs for Each Course */}
            {loadedCourses.map((course, index) => (
                <div key={index} className={styles.courseRow}>
                    <label>
                        {course.name} Combination:
                        <input
                            type="number"
                            value={combinationInputs[course.name] || 0}
                            onChange={(e) =>
                                handleCombinationChange(
                                    course,
                                    Number(e.target.value)
                                )
                            }
                            min="0"
                            max={course.numCombinations() - 1}
                        />
                        <input
                            type="button"
                            onChange={(e) => {}}
                            value="remove"
                        />
                    </label>
                </div>
            ))}

            {/* Render the Calendar with selected courses */}
            <WeeklyCalendar courses={courses} />

            {/* Course List */}
            <div className={styles.courseList}>
                {courses.map((course, index) => (
                    <div key={index}>{course.toString()}</div>
                ))}
            </div>
        </div>
    );
};

export default App;
