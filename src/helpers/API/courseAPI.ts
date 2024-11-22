import axios, { AxiosError } from "axios";

// Define the base URL
const BASE_URL = "https://www.sfu.ca/bin/wcm/course-outlines";

// Define the type for the API response
export type ApiResponse = Record<string, any>;

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

/**
 * Fetch the available years from the API.
 *
 * @returns {Promise<ApiResponse>} The data response from the API containing the years.
 */
export const getYears = async (): Promise<ApiResponse> => {
    try {
        const response = await axiosGetWithRetries(BASE_URL);
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
 * @returns {Promise<ApiResponse>} The data response from the API containing the terms.
 */
export const getTerms = async (year: string): Promise<ApiResponse> => {
    try {
        const url = buildApiUrl(year);
        const response = await axiosGetWithRetries(url);
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
 * @returns {Promise<ApiResponse>} The data response from the API containing the departments.
 */
export const getDepartments = async (
    year: string,
    term: string
): Promise<ApiResponse> => {
    try {
        const url = buildApiUrl(year, term);
        const response = await axiosGetWithRetries(url);
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
 * @returns {Promise<ApiResponse>} The data response from the API containing the course numbers.
 */
export const getCourseNumbers = async (
    year: string,
    term: string,
    department: string
): Promise<ApiResponse> => {
    try {
        const url = buildApiUrl(year, term, department);
        const response = await axiosGetWithRetries(url);
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
 * @returns {Promise<ApiResponse>} The data response from the API containing the course sections.
 */
export const getCourseSections = async (
    year: string,
    term: string,
    department: string,
    courseNumber: string
): Promise<ApiResponse> => {
    try {
        const url = buildApiUrl(year, term, department, courseNumber);
        const response = await axiosGetWithRetries(url);
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
 * @returns {Promise<ApiResponse>} The data response from the API containing the course outline.
 */
export const getCourseOutline = async (
    year: string,
    term: string,
    department: string,
    courseNumber: string,
    courseSection: string
): Promise<ApiResponse> => {
    try {
        const url = buildApiUrl(
            year,
            term,
            department,
            courseNumber,
            courseSection
        );
        const response = await axiosGetWithRetries(url);
        return response.data;
    } catch (error) {
        console.error(
            `Error fetching course outline for ${year} ${term} ${department} ${courseNumber} ${courseSection}:`,
            error
        );
        throw error;
    }
};

/**
 * Makes an HTTP GET request to the specified URL with retry logic.
 *
 * This function attempts to fetch data from the given URL using axios. If the request fails
 * due to a timeout, it will retry the request with exponential backoff and an increased timeout.
 *
 * @param url - The URL to send the GET request to.
 * @param maxRetries - The maximum number of retry attempts (default is 5).
 * @returns A promise that resolves to the API response data.
 * @throws Will throw an error if all retry attempts fail or if a non-timeout error occurs.
 */
const axiosGetWithRetries = async (
    url: string,
    maxRetries: number = 5
): Promise<ApiResponse> => {
    const expBase = 2;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            // Set the timeout dynamically based on the exponential backoff logic
            const timeout = Math.pow(expBase, attempt) * 1000; // 1, 2, 4, 8... seconds

            // Make the request with the calculated timeout
            const response = await axios.get(url, { timeout });
            return response; // Success
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.code === "ECONNABORTED") {
                console.error("Timeout error:", axiosError.message);
            } else if (axiosError.code) {
                console.error(
                    `Error on attempt #${attempt + 1}:`,
                    axiosError.message
                );
                throw error;
            }
        }
    }

    throw new Error("Max attempts reached.");
};
