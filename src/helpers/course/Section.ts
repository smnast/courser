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

    /**
     * Creates a new Section instance.
     *
     * @param name - The name of the section (e.g., "Section A").
     * @param sectionType - The type of the section (e.g., "LEC").
     * @param timeSlots - The list of time slots associated with the section.
     */
    constructor(name: string, sectionType: SectionType, timeSlots: Array<TimeSlot>) {
        this.name = name;
        this.sectionType = sectionType;
        this.timeSlots = timeSlots;
    }

    /**
     * Returns a string representation of the Section.
     *
     * @returns A string that includes the class name, section name, and a summary of the time slots.
     */
    toString(): string {
        const timeSlotSummary = this.timeSlots
            .map((ts) => ts.toString())
            .join(", ");
        return `${this.name} (${this.sectionType}): ${timeSlotSummary}`;
    }
}

export default Section;
