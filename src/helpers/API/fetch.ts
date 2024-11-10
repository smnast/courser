import axios from "axios";

// Define the base URL
const BASE_URL = "http://www.sfu.ca/bin/wcm/course-outlines";

/**
 * Utility function to build the API URL based on the provided parameters.
 *
 * @param {string} [year] - The year (optional).
 * @param {string} [term] - The term (optional).
 * @param {string} [department] - The department (optional).
 * @param {string} [courseNumber] - The course number (optional).
 * @param {string} [courseSection] - The course section (optional).
 * @returns {string} The constructed URL.
 */
const buildApiUrl = (
    year?: string,
    term?: string,
    department?: string,
    courseNumber?: string,
    courseSection?: string
): string => {
    let url = BASE_URL;

    if (year) url += `?${year}`;
    if (term) url += `/${term}`;
    if (department) url += `/${department}`;
    if (courseNumber) url += `/${courseNumber}`;
    if (courseSection) url += `/${courseSection}`;

    return url;
};

interface YearData {
    text: string;
    value: string;
}

/**
 * Fetch the available years from the API.
 *
 * @returns {Promise<YearData[]>} The data response from the API containing the years.
 */
export const getYears = async (): Promise<YearData[]> => {
    try {
        const response = await axios.get<YearData[]>(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching years:", error);
        throw error;
    }
};

/**
 * Fetch the available terms for a specific year.
 *
 * @param {string} year - The year to fetch terms for.
 * @returns {Promise<any>} The data response from the API containing the terms.
 */
export const getTerms = async (year: string): Promise<any> => {
    try {
        const url = buildApiUrl(year);
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching terms for year ${year}:`, error);
        throw error;
    }
};

/**
 * Fetch the available departments for a specific year and term.
 *
 * @param {string} year - The year to fetch departments for.
 * @param {string} term - The term to fetch departments for.
 * @returns {Promise<any>} The data response from the API containing the departments.
 */
export const getDepartments = async (
    year: string,
    term: string
): Promise<any> => {
    try {
        const url = buildApiUrl(year, term);
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching departments for ${year} ${term}:`, error);
        throw error;
    }
};

/**
 * Fetch the available course numbers for a specific year, term, and department.
 *
 * @param {string} year - The year to fetch course numbers for.
 * @param {string} term - The term to fetch course numbers for.
 * @param {string} department - The department to fetch course numbers for.
 * @returns {Promise<any>} The data response from the API containing the course numbers.
 */
export const getCourseNumbers = async (
    year: string,
    term: string,
    department: string
): Promise<any> => {
    try {
        const url = buildApiUrl(year, term, department);
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(
            `Error fetching course numbers for ${year} ${term} ${department}:`,
            error
        );
        throw error;
    }
};

/**
 * Fetch the available course sections for a specific year, term, department, and course number.
 *
 * @param {string} year - The year to fetch course sections for.
 * @param {string} term - The term to fetch course sections for.
 * @param {string} department - The department to fetch course sections for.
 * @param {string} courseNumber - The course number to fetch sections for.
 * @returns {Promise<any>} The data response from the API containing the course sections.
 */
export const getCourseSections = async (
    year: string,
    term: string,
    department: string,
    courseNumber: string
): Promise<any> => {
    try {
        const url = buildApiUrl(year, term, department, courseNumber);
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(
            `Error fetching course sections for ${year} ${term} ${department} ${courseNumber}:`,
            error
        );
        throw error;
    }
};

/**
 * Fetch the course outline for a specific year, term, department, course number, and course section.
 *
 * @param {string} year - The year to fetch the course outline for.
 * @param {string} term - The term to fetch the course outline for.
 * @param {string} department - The department to fetch the course outline for.
 * @param {string} courseNumber - The course number to fetch the outline for.
 * @param {string} courseSection - The course section to fetch the outline for.
 * @returns {Promise<any>} The data response from the API containing the course outline.
 */
export const getCourseOutline = async (
    year: string,
    term: string,
    department: string,
    courseNumber: string,
    courseSection: string
): Promise<any> => {
    try {
        const url = buildApiUrl(
            year,
            term,
            department,
            courseNumber,
            courseSection
        );
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(
            `Error fetching course outline for ${year} ${term} ${department} ${courseNumber} ${courseSection}:`,
            error
        );
        throw error;
    }
};
