/**
 * Parse a date from string to a Date object.
 * Use this instead of the `Date.parse` function,
 * because this is more accurate
 * @param rawDate The Date string
 * @returns A new `Date` instance
 */
export function parseDate(rawDate: string): Date {
    const [date, time] = rawDate.split(" ");
    const [dateDay, month, year] = date.split(".");
    const [hours, minutes] = time.split(":");

    return new Date(
        Number(year),
        Number(month) - 1,
        Number(dateDay),
        Number(hours),
        Number(minutes),
    );
}

/**
 * Validate that the first parameter is a string
 * @param data the data to validate
 * @returns whether the data is a string
 */
export function isText(data: string | unknown): data is string {
    return typeof data === "string";
}

export const defaultSubjectShorts: [string, string][] = [
    ["D", "Deutsch"],
    ["E", "Englisch"],
    ["WI", "Wirtschaft"],
    ["GGK", "Geschichte und Gemeinschaftskunde"],
    ["CH", "Chemie"],
    ["S", "Sport"],
    ["M", "Mathe"],
    ["BK", "Bildende Kunst"],
    ["BK1", "Bildende Kunst"],
    ["BK2", "Bildende Kunst"],
    ["GS", "Global Studies"],
    ["PH", "Physik"],
    ["IT", "Informatik"],
    ["INF", "Informationstechnik"],
    ["ITÜS", "IT Softwareentwicklung"],
    ["ITÜH", "IT Hardware"],
    ["EVR", "Religion"],
    ["ETH", "Ethik"],
    ["SP", "Zweitsprache"],
    ["IFÖM", "Mathe Förderunterricht"],
    ["IFÖE", "Englisch Förderunterricht"],
    ["IFÖD", "Deutsch Förderunterricht"],
]
