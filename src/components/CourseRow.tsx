import React from "react";
import Course from "@/helpers/course/Course";

/**
 * A row component that displays a course name and allows the user to select
 * a combination index and remove the course.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {Course} props.course - The course object containing details about the course.
 * @param {number} props.combinationIndex - The current selected combination index for the course.
 * @param {function(number): void} props.onCombinationChange - Callback to handle changes to the combination index.
 * @param {function(): void} props.onRemove - Callback to handle removing the course.
 * @returns {JSX.Element} The rendered `CourseRow` component.
 */
const CourseRow = ({
    course,
    combinationIndex,
    onCombinationChange,
    onRemove,
}: {
    course: Course;
    combinationIndex: number;
    onCombinationChange: (value: number) => void;
    onRemove: () => void;
}) => (
    <div>
        <label>
            {course.name} Combination:
            <input
                type="number"
                value={combinationIndex}
                onChange={(e) => onCombinationChange(Number(e.target.value))}
                min="0"
                max={course.numCombinations() - 1}
            />
        </label>
        <button onClick={onRemove}>Remove</button>
    </div>
);

export default CourseRow;
