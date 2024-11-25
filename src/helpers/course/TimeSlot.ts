import Campus from "@/helpers/course/Campus";
import WeekDay, { weekDayToPrettyString } from "@/helpers/course/WeekDay";
import { Dayjs } from "dayjs";

/**
 * Represents a time slot for a course section.
 */
class TimeSlot {
    /** The campus where the time slot is located */
    campus: Campus | null;

    /** The days of the week when the time slot occurs */
    days: WeekDay[];

    /** The start time of the time slot */
    startTime: Dayjs | null;

    /** The end time of the time slot */
    endTime: Dayjs | null;

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
        campus: Campus | null,
        days: WeekDay[] = [],
        startTime: Dayjs | null,
        endTime: Dayjs | null,
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
     * Determines if the current time slot overlaps with another time slot.
     *
     * @param timeSlot - The time slot to check for overlap with.
     * @returns `true` if the time slots overlap, otherwise `false`.
     */
    overlaps(timeSlot: TimeSlot): boolean {
        // If the time slot is not defined, then it cannot overlap
        if (!this.startTime || !this.endTime) return false;

        // Check that all properties overlap
        const hasOverlappingDates =
            this.startDate <= timeSlot.endDate &&
            this.endDate >= timeSlot.startDate;
        const hasOverlappingWeekdays = this.days.some((day) =>
            timeSlot.days.includes(day)
        );
        const isOverlappingTime =
            this.startTime.isBefore(timeSlot.endTime) &&
            this.endTime.isAfter(timeSlot.startTime);
        return (
            hasOverlappingDates && hasOverlappingWeekdays && isOverlappingTime
        );
    }

    /**
     * Checks if the time slot has both a start time and an end time defined.
     *
     * @returns {boolean} True if both startTime and endTime are valid objects, otherwise false.
     */
    isKnown(): boolean {
        return this.startTime !== null && this.endTime !== null;
    }

    /**
     * Returns a string representation of the days.
     *
     * @returns {string} A comma-separated string of days if available, otherwise "Unknown days".
     */
    getDaysString(): string {
        if (this.days.length === 0) {
            return "Unknown days";
        }
        return this.days
            .map((day: WeekDay) => {
                return weekDayToPrettyString(day);
            })
            .join(", ");
    }

    /**
     * Returns a formatted string representing the time slot.
     * If both `startTime` and `endTime` are defined, the format will be "HH:mm - HH:mm".
     * If either `startTime` or `endTime` is not defined, it returns "Unknown".
     *
     * @returns {string} The formatted time slot string or "Unknown" if times are not defined.
     */
    getTimesString(): string {
        return this.isKnown()
            ? `${this.startTime!.format("HH:mm")} - ${this.endTime!.format(
                  "HH:mm"
              )}`
            : "Unknown time";
    }

    /**
     * Returns a string representation of the TimeSlot.
     *
     * @returns A formatted string that represents the time slot,
     * including the campus, days, and start and end times.
     */
    toString(): string {
        return `${this.campus} ${this.days.join(", ")}` + this.getTimesString();
    }
}

export default TimeSlot;
