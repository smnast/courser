import axios from 'axios';

const base_url = 'http://www.sfu.ca/bin/wcm/course-outlines';

export const fetchData = async (inputs: string[] = [], retries: number = 3, maxTime: number = 250) => {
    // Exponential backoff: try to query for 250ms, then 500ms, then 1000ms, ...
    try {
        let queryUrl = base_url;
        if (inputs.length !== 0) {
            queryUrl += '?' + inputs.join('/');
        }
        const { data } = await axios.get(queryUrl, { timeout: maxTime });
        return data;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.log('Timeout reached.');
            if (retries >= 0) {
                console.log('Retrying...');
                return fetchData(url, retries - 1, maxTime * 2);
            } else {
                console.log('Max retries reached.');
            }
        }

        console.log('Axios error:', error);
        throw error;
    }
};

export const fetchYears = async () => {
    return fetchData();
};

export const fetchTerms = async (year: string) => {
    return fetchData([year]);
};

export const fetchDepartments = async (year: string, term: string) => {
    return fetchData([year, term]);
};

export const fetchCourses = async (year: string, term: string, department: string) => {
    return fetchData([year, term, department]);
};

export const fetchSections = async (year: string, term: string, department: string, course: string) => {
    return fetchData([year, term, department, course]);
};

export const fetchSectionData = async (year: string, term: string, department: string, course: string, section: string) => {
    return fetchData([year, term, department, course, section]);
};

export const fetchInstructors = async (year: string, term: string, department: string, course: string, section: string) => {
    return fetchSectionData(year, term, department, course, section).then(data => {
        return data.instructor.map(instructor => {
            return instructor.name;
        })
    });
};

export const fetchCourseName = async(year: string, term: string, department: string, course: string, section: string) => {
    return fetchSectionData(year, term, department, course, section).then(data => {
        return data.title;
    })
};

