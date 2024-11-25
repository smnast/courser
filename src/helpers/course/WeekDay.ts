enum WeekDay {
    Sunday = "Su",
    Monday = "Mo",
    Tuesday = "Tu",
    Wednesday = "We",
    Thursday = "Th",
    Friday = "Fr",
    Saturday = "Sa",
}

const fullWeekDayNames: { [key in WeekDay]: string } = {
    [WeekDay.Sunday]: "Sunday",
    [WeekDay.Monday]: "Monday",
    [WeekDay.Tuesday]: "Tuesday",
    [WeekDay.Wednesday]: "Wednesday",
    [WeekDay.Thursday]: "Thursday",
    [WeekDay.Friday]: "Friday",
    [WeekDay.Saturday]: "Saturday",
};

/**
 * Converts a string to a WeekDay enum value.
 *
 * @param weekDay - The string representation of the week day.
 * @returns The corresponding WeekDay enum value if the string is valid, otherwise undefined.
 */
export function stringToWeekDay(weekDay: string): WeekDay | undefined {
    if (Object.values(WeekDay).includes(weekDay as WeekDay)) {
        return weekDay as WeekDay;
    }
    return undefined;
}

/**
 * Converts a given `WeekDay` enum value to its corresponding index.
 *
 * @param weekDay - The `WeekDay` enum value to convert.
 * @returns The index of the `WeekDay` enum value.
 */
export function weekDayToIndex(weekDay: WeekDay): number {
    return Object.values(WeekDay).indexOf(weekDay);
}

/**
 * Converts a `WeekDay` enum value to its corresponding pretty string representation.
 *
 * @param weekDay - The `WeekDay` enum value to convert.
 * @returns The pretty string representation of the given `WeekDay`.
 */
export function weekDayToPrettyString(weekDay: WeekDay): string {
    return fullWeekDayNames[weekDay];
}

export default WeekDay;
