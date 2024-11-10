import TimeSlot from "@/helpers/course/TimeSlot";
import SectionType from "@/helpers/course/SectionType";

/**
 * Represents a section of a course.
 */
class Section {
    /** The name of the section */
    name: string;

    /** The type of the section */
    sectionType: SectionType;

    /** The time slots assigned to this section */
    timeSlots: Array<TimeSlot>;

    /** Whether the course is an enrollment type (or non-enrollment) */
    isEnrollment: boolean;

    /** The associated enrollment section index for this class */
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
        timeSlots: Array<TimeSlot>,
        isEnrollment: boolean,
        associatedClass: number
    ) {
        this.name = name;
        this.sectionType = sectionType;
        this.timeSlots = timeSlots;
        this.isEnrollment = isEnrollment;
        this.associatedClass = associatedClass;
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
        return `${this.name} (${this.sectionType}): ${timeSlotSummary}`;
    }
}

export default Section;
