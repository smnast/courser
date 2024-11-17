import React, { useState } from "react";

/**
 * A component for inputting a course name and triggering an add action.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {function(string): void} props.onAdd - Callback to handle adding a new course. 
 *      The input course name is passed as an uppercase string.
 * @returns {JSX.Element} The rendered `CourseInput` component.
 */
const CourseInput = ({ onAdd }: { onAdd: (courseName: string) => void }) => {
    const [courseInput, setCourseInput] = useState("");

    /**
     * Handles adding the course by passing the input to the `onAdd` callback
     * and clearing the input field.
     */
    const handleAdd = () => {
        if (courseInput.trim()) {
            onAdd(courseInput.toUpperCase());
            setCourseInput("");
        }
    };

    return (
        <div>
            <input
                type="text"
                value={courseInput}
                onChange={(e) => setCourseInput(e.target.value)}
                placeholder="Enter Course Name (e.g., CMPT 120)"
            />
            <button onClick={handleAdd}>Add Course</button>
        </div>
    );
};

export default CourseInput;
