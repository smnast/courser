enum WeekDay {
    Sunday = "Su",
    Monday = "Mo",
    Tuesday = "Tu",
    Wednesday = "We",
    Thursday = "Th",
    Friday = "Fr",
    Saturday = "Sa",
}

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

export default WeekDay;
