import { HSLColor } from "@/types/color";

/**
 * Generates a random RGB color string.
 *
 * @returns {string} A string representing a random HSL color in the format `HSL(h, s%, l%)`,
 * where `h` is a number between 0 and 360, and `s` and `l` are numbers between 0 and 100.
 */
export const generateCourseColor = (): HSLColor => {
    return `hsl(${randomInt(0, 359)}, ${randomInt(0, 100)}%, ${randomInt(40, 60)}%)`;
};

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 *
 * @param {number} min - The minimum value for the random integer.
 * @param {number} max - The maximum value for the random integer.
 * @returns {number} A random integer between the specified minimum and maximum values.
 */
const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
