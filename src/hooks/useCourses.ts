import { useState } from "react";
import { loadCourse } from "@/helpers/API/load";
import Course from "@/helpers/course/Course";
import { HSLColor } from "@/types/color";
import { generateCourseColor } from "@/helpers/colorUtils";

/**
 * A custom hook to manage the state and operations related to courses, including
 * loading courses, managing their combinations, and handling course removal.
 *
 * @returns {Object} An object containing course-related state and functions:
 * @property {Course[]} loadedCourses - The list of all loaded course objects.
 * @property {Course[]} courses - The list of currently selected course combinations.
 * @property {Object} combinationInputs - A mapping of course names to their selected combination index.
 * @property {Object} courseColors - A mapping of course names to their assigned color.
 * @property {function(string): Promise<void>} addCourse - Function to add a course by its name.
 * @property {function(string): void} removeCourse - Function to remove a course by its name.
 * @property {function(Course, number): void} handleCombinationChange - Function to update the combination index for a course.
 * @property {function(number): void} handleGlobalCombinationChange - Function to change the global combination by a specified direction.
 * @property {function(Object): boolean} hasConflicts - Function to check if there are conflicts between course combinations.
 */
export const useCourses = () => {
    const [loadedCourses, setLoadedCourses] = useState<Course[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [combinationInputs, setCombinationInputs] = useState<{
        [key: string]: number;
    }>({});
    const [courseColors, setCourseColors] = useState<{
        [key: string]: HSLColor;
    }>({});

    /**
     * Adds a course to the state by loading it and setting its default combination.
     *
     * @param {string} courseName - The name of the course (e.g., "CMPT 120").
     * @throws {Error} Throws an error if the course cannot be loaded.
     */
    const addCourse = async (courseName: string) => {
        const [department, courseNumber] = courseName.split(" ");
        const loadedCourse = await loadCourse(
            "2025",
            "spring",
            department,
            courseNumber
        );

        const alreadyAdded = loadedCourses.some(
            (prevCourse: Course) => prevCourse.name === courseName
        );
        if (alreadyAdded) {
            throw new Error("Course already added!");
        } else if (loadedCourse) {
            setLoadedCourses((prev) => [...prev, loadedCourse]);
            setCourses((prev) => [...prev, loadedCourse.getCombination(0)]);
            setCombinationInputs((prev) => ({
                ...prev,
                [courseName]: 0,
            }));
            setCourseColors((prev) => ({
                ...prev,
                [courseName]: generateCourseColor(),
            }));
        } else {
            throw new Error("Error loading course!");
        }
    };

    /**
     * Removes a course from the state, including its loaded data and combination index.
     *
     * @param {string} courseName - The name of the course to remove.
     */
    const removeCourse = (courseName: string) => {
        setCourses((prevCourses) =>
            prevCourses.filter((course) => course.name !== courseName)
        );
        setLoadedCourses((prevCourses) =>
            prevCourses.filter((course) => course.name !== courseName)
        );
        setCombinationInputs((prev) => {
            const updatedCombinations = { ...prev };
            delete updatedCombinations[courseName];
            return updatedCombinations;
        });
        setCourseColors((prev) => {
            const updatedColors = { ...prev };
            delete updatedColors[courseName];
            return updatedColors;
        });
    };

    /**
     * Updates the selected combination for a course in the state.
     *
     * @param {string} courseName - The name of the course to update.
     * @param {number} combinationIndex - The index of the new combination.
     */
    const updateCourseCombination = (
        courseName: string,
        combinationIndex: number
    ) => {
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

    /**
     * Handles changes to the combination index for a specific course.
     *
     * @param {Course} course - The course for which the combination is being changed.
     * @param {number} value - The new combination index value.
     */
    const handleCombinationChange = (course: Course, value: number) => {
        if (value < 0) value = 0;
        else if (value >= course.numCombinations())
            value = course.numCombinations() - 1;

        setCombinationInputs((prev) => {
            const updatedCombinations = { ...prev, [course.name]: value };
            updateCourseCombination(
                course.name,
                updatedCombinations[course.name]
            );
            return updatedCombinations;
        });
    };

    /**
     * Handles the change in global combination by a specified direction.
     *
     * @param direction - The direction by which the global combination should be changed (+1 or -1).
     */
    const handleGlobalCombinationChange = (direction: number) => {
        setCombinationInputs((prev) => {
            const prevJSON = JSON.stringify(prev);
            const updatedCombinations = { ...prev };
            do {
                let shouldContinue = true;
                for (
                    let i = loadedCourses.length - 1;
                    i >= 0 && shouldContinue;
                    i--
                ) {
                    const course = loadedCourses[i];
                    let newCombinationIndex =
                        updatedCombinations[course.name] + direction;
                    if (newCombinationIndex < 0) {
                        newCombinationIndex = course.numCombinations() - 1;
                    } else if (
                        newCombinationIndex >= course.numCombinations()
                    ) {
                        newCombinationIndex = 0;
                    } else {
                        shouldContinue = false;
                    }
                    updatedCombinations[course.name] = newCombinationIndex;
                }

                const repeated =
                    JSON.stringify(updatedCombinations) === prevJSON;
                if (repeated) {
                    break;
                }
            } while (hasConflicts(updatedCombinations));

            Object.keys(updatedCombinations).forEach((courseName) => {
                updateCourseCombination(
                    courseName,
                    updatedCombinations[courseName]
                );
            });
            return updatedCombinations;
        });
    };

    /**
     * Checks if there are any conflicts between the course combinations.
     *
     *
     *
     * @returns {boolean} - Returns true if there are conflicts between courses, otherwise false.
     */
    const hasConflicts = (combinations: { [key: string]: number }): boolean => {
        const proposedCourses = loadedCourses.map((course: Course) =>
            course.getCombination(combinations[course.name])
        );

        return proposedCourses.some((course: Course, index: number) => {
            return proposedCourses.some(
                (otherCourse: Course, otherIndex: number) => {
                    return index !== otherIndex && course.overlaps(otherCourse);
                }
            );
        });
    };

    return {
        loadedCourses,
        courses,
        combinationInputs,
        courseColors,
        addCourse,
        removeCourse,
        handleCombinationChange,
        handleGlobalCombinationChange,
    };
};
