enum SectionType {
    Lecture = "LEC",
    Lab = "LAB",
    Tutorial = "TUT",
    Seminar = "SEM",
    OpenLab = "OPL",
    Online = "OLC",
}

const fullSectionTypeNames: { [key in SectionType]: string } = {
    [SectionType.Lecture]: "Lecture",
    [SectionType.Lab]: "Lab",
    [SectionType.Tutorial]: "Tutorial",
    [SectionType.Seminar]: "Seminar",
    [SectionType.OpenLab]: "Open Lab",
    [SectionType.Online]: "Online",
};

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

/**
 * Converts a SectionType enum value to its corresponding pretty string representation.
 *
 * @param sectionType - The SectionType enum value to convert.
 * @returns The pretty string representation of the given SectionType.
 */
export function sectionTypeToPrettyString(sectionType: SectionType): string {
    return fullSectionTypeNames[sectionType];
}

export default SectionType;
