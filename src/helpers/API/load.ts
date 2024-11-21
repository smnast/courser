import * as CourseAPI from "@/helpers/API/courseAPI";
import Course from "@/helpers/course/Course";
import Section from "@/helpers/course/Section";
import SectionType, { stringToSectionType } from "../course/SectionType";
import TimeSlot from "@/helpers/course/TimeSlot";
import { stringToCampus } from "../course/Campus";
import { stringToWeekDay } from "../course/WeekDay";
import dayjs from "dayjs";

/**
 * Loads a course, including its sections, based on the provided year, term, department, and course number.
 *
 * @param year - The academic year of the course (e.g., "2025").
 * @param term - The term for the course (e.g., "spring").
 * @param department - The department offering the course (e.g., "CMPT").
 * @param courseNumber - The course number (e.g., "120").
 * @returns A promise that resolves to a `Course` object containing the course name and its associated sections, or null if an error occurs.
 */
export const loadCourse = async (
    year: string,
    term: string,
    department: string,
    courseNumber: string
): Promise<Course | null> => {
    try {
        // Fetch course sections from the API
        const response = await CourseAPI.getCourseSections(
            year,
            term,
            department,
            courseNumber
        );

        // Construct the course name
        const courseName = `${department} ${courseNumber}`;

        // Use Promise.all to ensure all sections are loaded asynchronously before proceeding
        const sections = await Promise.all(
            response.map(async (section: CourseAPI.ApiResponse) => {
                // Load each section
                return loadSection(
                    year,
                    term,
                    department,
                    courseNumber,
                    section.text,
                    response
                );
            })
        );

        // Return a new Course object with the loaded sections
        return new Course(courseName, sections);
    } catch (error) {
        console.error("Failed to load course:", error);
        return null;
    }
};

/**
 * Loads a specific course section, including its time slots and additional details.
 *
 * @param year - The academic year of the course (e.g., "2025").
 * @param term - The term for the course (e.g., "spring").
 * @param department - The department offering the course (e.g., "CMPT").
 * @param courseNumber - The course number (e.g., "120").
 * @param sectionName - The section name (e.g., "A1").
 * @param courseReponse - The course response data.
 * @returns A promise that resolves to a `Section` object containing details about the section, including its time slots.
 */
export const loadSection = async (
    year: string,
    term: string,
    department: string,
    courseNumber: string,
    sectionName: string,
    courseResponse: CourseAPI.ApiResponse
): Promise<Section> => {
    // Fetch section outline and course sections from the API
    const sectionResponse = await CourseAPI.getCourseOutline(
        year,
        term,
        department,
        courseNumber,
        sectionName
    );

    // Find the corresponding section details
    const courseSection = courseResponse.find(
        (section: CourseAPI.ApiResponse) => section.text === sectionName
    );

    // Determine if enrollment is available for the section and find associated class information
    const isEnrollment = courseSection?.classType === "e" || false;
    const associatedClass = courseSection
        ? Number(courseSection.associatedClass)
        : 0;
    const sectionType =
        stringToSectionType(courseSection?.sectionCode || "LEC") ||
        SectionType.Lecture;

    // Load time slots asynchronously
    const timeSlots = await Promise.all(
        (sectionResponse.courseSchedule || []).map(
            (timeSlot: CourseAPI.ApiResponse) => {
                return loadTimeSlot(timeSlot);
            }
        )
    );

    // Return a new Section object with the loaded details
    return new Section(
        sectionName,
        sectionType,
        timeSlots,
        isEnrollment,
        associatedClass
    );
};

/**
 * Loads a time slot object from the API response, transforming the raw data into a `TimeSlot` object.
 *
 * @param timeSlotData - The raw API response data for a time slot.
 * @returns A promise that resolves to a `TimeSlot` object.
 */
export const loadTimeSlot = async (
    timeSlotData: CourseAPI.ApiResponse
): Promise<TimeSlot> => {
    // Convert campus, weekdays, and time fields into proper formats
    const campus = stringToCampus(timeSlotData.campus) || null;
    const weekDays = timeSlotData.days
        ? timeSlotData.days
              .split(", ")
              .map((day: string) => stringToWeekDay(day))
        : [];
    const startTime = dayjs(timeSlotData.startTime, "H:mm");
    const endTime = dayjs(timeSlotData.endTime, "H:mm");
    const startDate = new Date(timeSlotData.startDate);
    const endDate = new Date(timeSlotData.endDate);
    const isExam = timeSlotData.isExam;

    // Return a new TimeSlot object with the processed data
    return new TimeSlot(
        campus,
        weekDays,
        startTime,
        endTime,
        startDate,
        endDate,
        isExam
    );
};

/**
 * Loads the available years for a given course, which can be used to filter available courses.
 *
 * @returns A promise that resolves to an array of years as strings (e.g., ["2025", "2026"]).
 */
export const loadYears = async () => {
    // Fetch years from the API
    const response = await CourseAPI.getYears();
    // Map the raw response to an array of years
    const years = response.map((year: CourseAPI.ApiResponse) => year.text);
    return years;
};

/**
 * Loads the available terms for a given academic year.
 *
 * @param year - The academic year for which terms are to be fetched (e.g., "2025").
 * @returns A promise that resolves to an array of terms as strings (e.g., ["spring", "fall"]).
 */
export const loadTerms = async (year: string) => {
    // Fetch terms from the API for the specified year
    const response = await CourseAPI.getTerms(year);
    // Map the raw response to an array of terms
    const terms = response.map((term: CourseAPI.ApiResponse) => term.text);
    return terms;
};

/**
 * Loads the available departments for a given academic year and term.
 *
 * @param year - The academic year (e.g., "2025").
 * @param term - The academic term (e.g., "spring").
 * @returns A promise that resolves to an array of departments as strings (e.g., ["CMPT", "MATH"]).
 */
export const loadDepartments = async (year: string, term: string) => {
    // Fetch departments from the API for the specified year and term
    const response = await CourseAPI.getDepartments(year, term);
    // Map the raw response to an array of department names
    const departments = response.map(
        (department: CourseAPI.ApiResponse) => department.text
    );
    return departments;
};
