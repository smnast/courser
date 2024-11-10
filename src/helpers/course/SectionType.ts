enum SectionType {
    Lecture = "LEC",
    Lab = "LAB",
    Tutorial = "TUT",
    OpenLab = "OPL",
}

export function stringToSectionType(sectionType: string): SectionType | undefined {
    if (Object.values(SectionType).includes(sectionType as SectionType)) {
        return sectionType as SectionType;
    }
    return undefined;
}

export default SectionType;
