import Section from "@/helpers/course/Section";
import SectionType from "@/helpers/course/SectionType";
import EnrollmentOption, { optionCombinations } from "./EnrollmentOption";

/**
 * Represents a course with multiple sections.
 */
class Course {
    /** The name of the course (e.g., "MATH 152") */
    name: string;

    /** The list of sections offered for this course */
    readonly sections: Section[];

    /** The enrollment options for this course */
    enrollmentOptions: EnrollmentOption[];

    /**
     * Creates a new Course instance.
     *
     * @param name - The name of the course (e.g., "MATH 152").
     * @param sections - The sections available for the course.
     */
    constructor(name: string, sections: Section[]) {
        this.name = name;
        this.sections = sections;

        // Initialize enrollment options
        this.enrollmentOptions = [];
        this.initializeCombinations();
    }

    /**
     * Initializes the enrollment combinations for the course.
     */
    initializeCombinations(): void {
        const enrollmentSections = this.sections.filter(
            (section) => section.isEnrollment
        );
        const classNumbers = enrollmentSections.map(
            (section) => section.associatedClass
        );

        this.enrollmentOptions = enrollmentSections.map(
            (enrollmentSection): EnrollmentOption => {
                const sectionTypes = [
                    SectionType.Lecture,
                    SectionType.Lab,
                    SectionType.Tutorial,
                    SectionType.OpenLab,
                    SectionType.Online,
                ];
                const [lectures, labs, tutorials, openLabs, online] =
                    sectionTypes.map((type) =>
                        this.sections.filter((section) => {
                            const isType = section.sectionType === type;
                            const isAssociatedClass =
                                section.associatedClass ===
                                enrollmentSection.associatedClass;
                            const isOpen = !classNumbers.includes(
                                section.associatedClass
                            );
                            return isType && (isAssociatedClass || isOpen);
                        })
                    );

                return {
                    lectures: lectures,
                    labs: labs,
                    tutorials: tutorials,
                    openLabs: openLabs,
                    online: online,
                };
            }
        );
    }

    /**
     * Returns the number of enrollment combinations for the course.
     *
     * @returns The number of combinations.
     */
    numCombinations(): number {
        let combinations = 0;
        for (const option of this.enrollmentOptions) {
            combinations += optionCombinations(option);
        }
        return combinations;
    }

    /**
     * Returns the combination at the specified index.
     *
     * @param index - The index of the combination to retrieve.
     * @returns The course object with the selected combination of sections.
     */
    getCombination(index: number): Course {
        if (index < 0 || index >= this.numCombinations()) {
            throw new Error("Invalid index");
        }

        // Loop through enrollment options to find the matching combination
        for (let i = 0; i < this.enrollmentOptions.length; i++) {
            const option = this.enrollmentOptions[i];
            const numCombinations = optionCombinations(option);

            if (index < numCombinations) {
                // Calculate indices for each category with fallback handling for empty categories
                const sectionCounts = [
                    option.lectures.length,
                    option.labs.length,
                    option.tutorials.length,
                    option.openLabs.length,
                    option.online.length,
                ];

                // Calculate the indices for each category, or null if the category is empty
                let indices = [];
                for (let j = 0; j < sectionCounts.length; j++) {
                    const count = sectionCounts[j];
                    if (count > 0) {
                        let remainingCombinations = optionCombinations(
                            option,
                            j + 1
                        );
                        let sectionIndex = Math.floor(
                            index / remainingCombinations
                        );
                        indices.push(sectionIndex);
                        index %= remainingCombinations;
                    } else {
                        indices.push(null);
                    }
                }

                // Assign sections based on the calculated indices
                const sections = [
                    option.lectures[indices[0] ?? 0] || null,
                    option.labs[indices[1] ?? 0] || null,
                    option.tutorials[indices[2] ?? 0] || null,
                    option.openLabs[indices[3] ?? 0] || null,
                    option.online[indices[4] ?? 0] || null,
                ];

                // Remove null sections and return the Course object
                return new Course(this.name, sections.filter(Boolean));
            }

            // Reduce the index by the number of combinations already processed
            index -= numCombinations;
        }

        throw new Error("Invalid combination");
    }

    /**
     * Determines if the current course overlaps with another course.
     *
     * This method checks if any section of the current course overlaps with any section
     * of the provided course. It iterates through each section of the current course and
     * compares it with each section of the provided course to see if there is any overlap.
     *
     * @param course - The course to check for overlapping sections.
     * @returns `true` if there is an overlap between any sections of the two courses, otherwise `false`.
     */
    overlaps(course: Course): boolean {
        return this.sections.some((section) => {
            return course.sections.some((otherSection) => {
                return section.overlaps(otherSection);
            });
        });
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
