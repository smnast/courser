enum SectionType {
    Lecture = "LEC",
    Lab = "LAB",
    Tutorial = "TUT",
    Seminar = "SEM",
    OpenLab = "OPL",
    Online = "OLC",
}

/**
 * Converts a string to a SectionType if it matches one of the SectionType values.
 *
 * @param sectionType - The string to convert to a SectionType.
 * @returns The corresponding SectionType if the string matches a SectionType value, otherwise undefined.
 */
export function stringToSectionType(
    sectionType: string
): SectionType | undefined {
    if (Object.values(SectionType).includes(sectionType as SectionType)) {
        return sectionType as SectionType;
    }
    return undefined;
}

export default SectionType;
