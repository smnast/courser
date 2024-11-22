import { HSLColor } from "@/types/color";

let generatedColors: HSLColor[] = []; // Track previously generated colors

/**
 * Generates an HSL color with a blue-grey color scheme.
 * Dynamically generates 3 candidate colors and picks the one with the best balance of distinctness.
 *
 * @returns {HSLColor} A string representing an HSL color in the format `hsl(h, s%, l%)`.
 */
export const generateCourseColor = (): HSLColor => {
    const candidates: HSLColor[] = [];

    // Generate 5 candidate colors with a blue-grey color scheme
    const numCandidates = 5;
    for (let i = 0; i < numCandidates; i++) {
        const h = randomInt(190, 220);  // Hue range for blue-grey
        const s = randomInt(15, 40);    // Lower saturation range
        const l = randomInt(40, 60);    // Lightness for subtle, readable colors
        candidates.push(`hsl(${h}, ${s}%, ${l}%)`);
    }

    // Pick the candidate color that best balances distinctness
    const selectedColor = candidates.reduce((best, candidate) => {
        const candidateScore = calculateColorScore(candidate);
        const bestScore = calculateColorScore(best);
        return candidateScore > bestScore ? candidate : best;
    });

    // Save the selected color to the history
    generatedColors.push(selectedColor);

    return selectedColor;
};

/**
 * Calculates a "score" for a candidate color based on its distinctness
 * from previously generated colors, considering both hue and saturation.
 *
 * @param {HSLColor} candidate - The HSL color being evaluated.
 * @returns {number} The score of the candidate color.
 */
const calculateColorScore = (candidate: HSLColor): number => {
    const [candidateHue, candidateSat] = extractHueAndSaturation(candidate);

    // If no prior colors exist, return a high score
    if (generatedColors.length === 0) return Number.MAX_SAFE_INTEGER;

    // Calculate the average "spread" between the candidate and all generated colors
    const scores = generatedColors.map((existingColor) => {
        const [existingHue, existingSat] = extractHueAndSaturation(existingColor);

        // Calculate weighted distance (normalize hue and saturation differences)
        const hueDiff = Math.abs(candidateHue - existingHue) / 40; // Normalize hue difference
        const satDiff = Math.abs(candidateSat - existingSat) / 25; // Normalize saturation difference
        return Math.sqrt(hueDiff ** 2 + satDiff ** 2); // Euclidean distance
    });

    // Compute the minimum instance of the scores
    const minInstanceScore = Math.min(...scores);
    return minInstanceScore;
};

/**
 * Extracts the hue and saturation from an HSL color string.
 *
 * @param {HSLColor} color - The HSL color string (e.g., "hsl(220, 80%, 50%)").
 * @returns {[number, number]} The hue and saturation values as a tuple.
 */
const extractHueAndSaturation = (color: HSLColor): [number, number] => {
    const match = color.match(/hsl\((\d+),\s*(\d+)%/);
    return match ? [parseInt(match[1], 10), parseInt(match[2], 10)] : [0, 0];
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
