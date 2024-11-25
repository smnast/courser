import TimeSlot from "@/helpers/course/TimeSlot";
import SectionType, { sectionTypeToPrettyString } from "@/helpers/course/SectionType";
import Instructor from "./Instructor";

/**
 * Represents a section of a course.
 */
class Section {
    /** The name of the section */
    name: string;

    /** The type of the section */
    sectionType: SectionType;

    /** The time slots assigned to this section */
    timeSlots: TimeSlot[];

    /** An array of Instructor objects associated with the course section */
    instructors: Instructor[];

    /** Whether the course is an enrollment type (or non-enrollment) */
    isEnrollment: boolean;

    /** The associatd enrollment section index for this class */
    associatedClass: number;

    /**
     * Creates a new Section instance.
     *
     * @param name - The name of the section (e.g., "D100").
     * @param sectionType - The type of the section (e.g., "LEC").
     * @param timeSlots - The list of time slots associated with the section.
     * @param isEnrollment - Whether the section is an enrollment type (or non-enrollment).
     * @param associatedCLass - The associated enrollment section index for this class.
     */
    constructor(
        name: string,
        sectionType: SectionType,
        instructors: Instructor[],
        timeSlots: TimeSlot[],
        isEnrollment: boolean,
        associatedClass: number
    ) {
        this.name = name;
        this.sectionType = sectionType;
        this.timeSlots = timeSlots;
        this.instructors = instructors;
        this.isEnrollment = isEnrollment;
        this.associatedClass = associatedClass;
    }

    /**
     * Determines if the current section overlaps with another section.
     *
     * @param section - The section to check for overlap with the current section.
     * @returns `true` if there is an overlap between any time slots of the current section and the provided section, otherwise `false`.
     */
    overlaps(section: Section): boolean {
        return this.timeSlots.some((timeSlot) => {
            return section.timeSlots.some((otherTimeSlot) => {
                return timeSlot.overlaps(otherTimeSlot);
            });
        });
    }

    /**
     * Returns a string representation of the instructors.
     * 
     * @returns {string} A comma-separated string of instructor names.
     */
    getInstructorString(): string {
        return this.instructors.join(", ");
    }

    /**
     * Generates a formatted string representing the section name.
     *
     * @returns {string} A string combining the pretty-printed section type and the section name.
     */
    getNameString(): string {
        return `${sectionTypeToPrettyString(this.sectionType)}: ${this.name}`
    }

    /**
     * Returns a string representation of the Section.
     *
     * @returns A string that includes the section name and a summary of its time slots.
     */
    toString(): string {
        const timeSlotSummary = this.timeSlots
            .map((ts) => ts.toString())
            .join(", ");
        return `${this.name} with ${this.instructors} (${
            this.sectionType
        }): ${timeSlotSummary}`;
    }
}

export default Section;
