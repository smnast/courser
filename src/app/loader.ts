import * as api from './api';
import { Course, Section, ScheduleItem } from './course';

export const loadCourse = async (year: string, term: string, department: string, course: string) => {
    const courseName = api.fetchCourseName(year, term, department, course);
    const sections = api.fetchSections(year, term, department, course).then(data => {
        return data.map(section => {
            const sectionName = section.value;
            const classType = section.classType;
            const sectionCode = section.sectionCode;
            const associatedClass = +section.associatedClass; // '+' converts to number
            return loadSection(year, term, department, course, sectionName, classType, sectionCode, associatedClass);
        });
    });
    return new Course(courseName, sections);
}

const loadSection = async (year: string, term: string, department: string, course: string, sectionName: string, classType: string, associatedClass: number, sectionCode: string) => {
  const scheduleItems = loadScheduleItems(year, term, department, course, sectionName);
  const instructors = api.fetchInstructors(year, term, department, course, sectionName);
  return new Section(sectionName, classType, associatedClass, scheduleItems, instructors, sectionCode);
}

const loadScheduleItems = async (year: string, term: string, department: string, course: string, sectionName: string) => {
    return api.fetchSectionSchedule(year, term, department, course, sectionName).then(data => {
        return data.map(itemData => {
            const campus = itemData.campus;
            const daysOfTheWeek = itemData.days.split(', ');
            const startDay = itemData.startDate;
            const endDay = itemData.endDate;
            const startTime = itemData.startTime;
            const endTime = itemData.endTime;
            return new ScheduleItem(campus, daysOfTheWeek, startDay, endDay, startTime, endTime);
        });
    });
}
