import Campus from "@/helpers/course/Campus";
import WeekDay from "@/helpers/course/WeekDay";
import { Dayjs } from "dayjs";

/**
 * Represents a time slot for a course section.
 */
class TimeSlot {
    /** The campus where the time slot is located */
    campus: Campus;

    /** The days of the week when the time slot occurs */
    days: WeekDay[];

    /** The start time of the time slot */
    startTime: Dayjs;

    /** The end time of the time slot */
    endTime: Dayjs;

    /** The start date of the time slot */
    startDate: Date;

    /** The end date of the time slot */
    endDate: Date;

    /** Indicates if the time slot is for an exam */
    isExam: boolean;

    /**
     * Creates a new TimeSlot instance.
     *
     * @param campus - The campus where the time slot is located.
     * @param days - The days of the week when the time slot occurs.
     * @param startTime - The start time of the time slot.
     * @param endTime - The end time of the time slot.
     * @param startDate - The start date of the time slot.
     * @param endDate - The end date of the time slot.
     * @param isExam - Indicates if the time slot is for an exam.
     */
    constructor(
        campus: Campus,
        days: WeekDay[] = [],
        startTime: Dayjs,
        endTime: Dayjs,
        startDate: Date,
        endDate: Date,
        isExam: boolean
    ) {
        this.campus = campus;
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isExam = isExam;
    }

    /**
     * Returns a string representation of the TimeSlot.
     *
     * @returns A formatted string that represents the time slot,
     * including the campus, days, and start and end times.
     */
    toString(): string {
        return `${this.campus} ${this.days.join(
            ", "
        )} ${this.startTime.toString()} - ${this.endTime.toString()}`;
    }
}

export default TimeSlot;
