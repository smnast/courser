import { parse, parseISO, isAfter, isBefore } from 'date-fns';

type Campus = 'Surrey' | 'Burnaby' | 'Vancouver';
type Day = 'Su' | 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa';
type ClassType = 'e' | 'n';
type SectionCode = 'LEC' | 'TUT' | 'LAB' | 'SEM' | 'OPL';

export class Course {
    courseName: string;
    sections: Section[];

    constructor(courseName: string, sections: Section[]) {
        this.courseName = courseName;
        this.sections = sections;
    }
};

export class Section {
    sectionName: string;
    classType: ClassType;
    associatedClass: number;
    scheduleItems: ScheduleItem[];
    instructors: string[];
    sectionCode: SectionCode;

    constructor(
        sectionName: string,
        classType: ClassType,
        associatedClass: number,
        scheduleItems: ScheduleItem[],
        instructors: string[],
        sectionCode: SectionCode
    ) {
        this.sectionName = sectionName;
        this.classType = classType;
        this.associatedClass = associatedClass;
        this.scheduleItems = scheduleItems;
        this.instructors = instructors;
        this.sectionCode = sectionCode;
    }
};

export class ScheduleItem {
    campus: Campus;
    daysOfTheWeek: Day[];
    startTime: Date;
    endTime: Date;
    startDay: Date;
    endDay: Date;

    constructor(campus: string, daysOfTheWeek: Day[], startDay: string, endDay: string, startTime: string, endTime: string) {
        this.campus = campus;
        this.daysOfTheWeek = daysOfTheWeek;
        this.startTime = parse(startTime, 'HH:mm', new Date());
        this.endTime = parse(endTime, 'HH:mm', new Date());
        this.startDay = this.parseDay(startDay, 'yyyy-MM-dd', new Date());
        this.endDay = this.parseDay(endDay, 'yyyy-MM-dd', new Date());
    }

    private parseDay(dateStr: string): Date {
        const cleanedDateStr = dateStr.replace(/\s[A-Z]{3}\s/, ' ');
        return parse(cleanedDateStr, 'EEE MMM dd HH:mm:ss yyyy', new Date());
    }

    overlaps(other: ScheduleItem): boolean {
        // Days of the week overlap
        overlappingDays = daysOfTheWeek.filter(day => other.daysOfTheWeek.includes(day));
        if (overlappingDays.length === 0) return false;

        // Dates overlap
        if (isBefore(this.endDay, other.startDay) || isBefore(other.endDay, this.startDay)) {
            return false;
        }

        // Times overlap
        return (isBefore(this.startTime, other.startTime) && isAfter(this.endTime, other.endTime)) || (isBefore(this.startTime, other.startTime) && isAfter(this.endTime, other.endTime));
    }
};
