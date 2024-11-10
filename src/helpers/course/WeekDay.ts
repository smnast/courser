enum WeekDay {
    Sunday = "Su",
    Monday = "Mo",
    Tuesday = "Tu",
    Wednesday = "We",
    Thursday = "Th",
    Friday = "Fr",
    Saturday = "Sa",
}

export function stringToWeekDay(weekDay: string): WeekDay | undefined {
    if (Object.values(WeekDay).includes(weekDay as WeekDay)) {
        return weekDay as WeekDay;
    }
    return undefined;
}

export function weekDayToIndex(weekDay: WeekDay): number {
    return Object.values(WeekDay).indexOf(weekDay);
}

export default WeekDay;
