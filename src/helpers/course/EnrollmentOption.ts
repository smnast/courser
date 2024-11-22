import Section from "./Section";

interface EnrollmentOption {
    lectures: Section[];
    labs: Section[];
    tutorials: Section[];
    seminars: Section[];
    openLabs: Section[];
    online: Section[];
}

/**
 * Returns the number of enrollment combinations for the course, starting at the given index.
 * 
 * @param enrollmentOption The enrollment option to calculate the number of combinations for.
 * @param start The index to start at. Defaults to 0.
 * @returns The number of combinations.
 */
export const optionCombinations = (enrollmentOption: EnrollmentOption, start: number = 0): number => {
    const counts = [
        enrollmentOption.lectures.length,
        enrollmentOption.labs.length,
        enrollmentOption.tutorials.length,
        enrollmentOption.seminars.length,
        enrollmentOption.openLabs.length,
        enrollmentOption.online.length,
    ];

    let combinations = 1;
    for (let i = start; i < counts.length; i++) {
        combinations *= Math.max(counts[i], 1);
    }

    return combinations;
}

export default EnrollmentOption;