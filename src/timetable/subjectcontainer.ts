export interface SubjectContainer {
    subjectShorts: Map<string, string>;
    registerSubjectShorts(subjectShorts: Map<string, string>): void;
}
