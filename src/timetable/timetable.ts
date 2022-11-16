import { Entry } from "./entry";
import { CheerioAPI, load } from "cheerio";
import { SubjectContainer } from "./subjectcontainer";
import { defaultSubjectShorts } from "../utility";

/**
 * The time table resource
 */
export class TimeTable implements SubjectContainer {
    public subjectShorts = new Map<string, string>(defaultSubjectShorts);

    /**
     * Parse the `TimeTable` from HTML in a custom way
     *
     * @param html The html object from where the data is to be extracted
     * @returns a new `TimeTable` instance
     *
     * @example
     * ```js
     * // use custom html-handler
     * TimeTable.fromHtmlHandler = (html) => {
     *     var div = html("my-div")
     *     var data = div.text()
     *
     *     return new TimeTable(...)
     * }
     * ```
     *
     * @example
     * ```js
     * // reset html-handler to default
     * TimeTable.fromHtmlHandler = undefined
     * ```
     */
    public static fromHtmlHandler: (html: CheerioAPI) => TimeTable;

    constructor(public readonly entries: Entry[]) {
        entries.forEach((e) => e.registerSubjectShorts(this.subjectShorts));
    }

    /**
     * Update the subject shorts for all entries in this timetable instance
     * @param subjectShorts The subject shorts mapped to their long name
     *
     * @example
     * ```js
     * timetable.registerSubjectShorts(new Map([["D", "Deutsch"]]))
     * ```
     */
    public registerSubjectShorts(subjectShorts: Map<string, string>): void {
        for (const [k, v] of subjectShorts) {
            this.subjectShorts.set(k, v);
        }

        for (const entry of this.entries) {
            entry.registerSubjectShorts(subjectShorts);
        }
    }

    public addEntry(entry: Entry) {
        entry.registerSubjectShorts(this.subjectShorts);
        this.entries.push(entry);
    }

    /**
     * Find a certain entry by the class name
     * @param className The class name you want to search for
     * @returns an Array of Entries that match the className
     * */
    public findByClassName(className: string): Entry[] {
        return this.entries.filter((entry) =>
            entry.className.includes(className),
        );
    }

    /**
     * Find a certain entry by a room name
     * @param roomName The room you want to search for
     * @returns an Array of Entries that match the roomName
     * */
    public findByRoom(roomName: string): Entry[] {
        return this.entries.filter(
            (entry) => entry.oldRoom === roomName || entry.newRoom === roomName,
        );
    }

    /**
     * Find a certain subject by its subject short.
     * For e.g the short for `Englisch` would be `E`.
     *
     * If you want to find a subject based on its long name,
     * use the `TimeTable.findBySubjectLong` function
     *
     * @param subject The subject short you want to search for
     * @returns an Array of Entries that match the subject
     * */
    public findBySubjectShort(subject: string): Entry[] {
        return this.entries.filter(
            (entry) =>
                entry.oldSubject === subject || entry.newSubject === subject,
        );
    }

    /**
     * Find a certain subject by its long subject name.
     * For e.g `Englisch` for `E`.
     *
     * If you want to find a subject based on its subject short, then please
     * use the `TimeTable.findBySubjectShort` function
     *
     * @param subject The full subject name
     * @returns an Array of Entries that match the subject
     */
    public findBySubjectLong(subject: string): Entry[] | undefined {
        return this.entries.filter(
            (entry) =>
                entry.longOldSubject === subject ||
                entry.longNewSubject === subject,
        );
    }

    public static cleanedString(str: string): string {
        return str.replace(/\t|\n/g, "");
    }

    /**
     * Create a new `TimeTable` from HTML
     * @param rawHtml The raw html string
     * @returns A new `TimeTable` resource
     */
    public static fromHtml(rawHtml: string) {
        const $ = load(rawHtml);
        if (TimeTable.fromHtmlHandler !== undefined) {
            return TimeTable.fromHtmlHandler($);
        }

        const centers = $("center");
        const entries: Entry[] = [];

        for (const center of centers) {
            if (center.children.length <= 1) {
                continue;
            }
            const day = $(center)
                .find(".mon_title")
                .text()
                .replace(",", "")
                .split(" ")[1];

            const [dateDay, month, year] = $(center)
                .find(".mon_title")
                .text()
                .split(" ")[0]
                .split(".");

            // Create new date from text
            const date = new Date(
                Number(year),
                Number(month) - 1,
                Number(dateDay),
            );

            for (const row of $(center).find("tr")) {
                if ($(row).find("th").length !== 0) continue;

                const columns = $(row).find("td");

                let period = $(columns[1]).text();
                if (period.includes("-")) {
                    period = period.split("-")[0];
                }

                entries.push(
                    new Entry(
                        date,
                        day,
                        this.cleanedString($(columns[0]).text()).split(/, |,/),
                        Number(period),
                        this.cleanedString($(columns[2]).text()),
                        this.cleanedString($(columns[3]).text()),
                        this.cleanedString($(columns[4]).text()),
                        this.cleanedString($(columns[5]).text()),
                        this.cleanedString($(columns[6]).text()),
                        this.cleanedString($(columns[7]).text()),
                    ),
                );
            }
        }

        return new TimeTable(entries);
    }

    /**
     * @returns This object as a `JSON` representation
     */
    public toJSON(): object {
        return {
            entries: this.entries,
        };
    }

    /**
     * Create a new instance from `JSON`
     * @param data The `JSON` data
     * @returns A new `TimeTable` instance
     */
    public static fromJSON(data: object): TimeTable {
        const entries: Entry[] = [];
        for (const entry of data["entries"]) {
            entries.push(Entry.fromJSON(entry));
        }

        return new TimeTable(entries);
    }
}
