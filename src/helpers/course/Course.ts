import Section from "@/helpers/course/Section";

/**
 * Represents a course with multiple sections.
 */
class Course {
    /** The name of the course (e.g., "Math 101") */
    name: string;

    /** The list of sections offered for this course */
    readonly sections: Section[];

    /**
     * Creates a new Course instance.
     *
     * @param name - The name of the course (e.g., "Math 101").
     * @param sections - The sections available for the course.
     */
    constructor(name: string, sections: Section[]) {
        this.name = name;
        this.sections = sections;
    }

    /**
     * Returns a string representation of the Course, including its name and sections.
     *
     * @returns A string that includes the course name and a summary of its sections.
     */
    toString(): string {
        const sectionSummary = this.sections
            .map((section) => section.toString())
            .join(", ");
        return `${this.name}: ${sectionSummary}`;
    }
}

export default Course;
