enum Campus {
    Burnaby = "Burnaby",
    Surrey = "Surrey",
    Vancouver = "Vancouver",
    Online = "Online",
}

/**
 * Converts a string to a Campus enum value.
 *
 * @param campus - The campus as a string.
 * @returns The corresponding Campus enum value or undefined if the string doesn't match.
 */
export function stringToCampus(campus: string): Campus | undefined {
    // Check if the campus string is a valid Campus enum value
    return Object.values(Campus).includes(campus as Campus)
        ? (campus as Campus)
        : undefined;
}

export default Campus;
