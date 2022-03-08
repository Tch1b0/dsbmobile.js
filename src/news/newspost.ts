import { isText, parseDate } from "@/utility";

export class NewsPost {
    public readonly date: Date;

    constructor(
        public readonly title: string,
        date: Date | string,
        public readonly detail: string,
    ) {
        this.date = isText(date) ? new Date(date) : date;
    }

    /**
     * Create a `NewsPost` object from JSON
     * @param json The json object you want to generate a `NewsPost` from
     * @returns A new `NewsPost`
     */
    public static fromApiResponse(json: object): NewsPost {
        let date = parseDate(json["Date"]);

        return new NewsPost(json["Title"], date, json["Detail"]);
    }

    /**
     * @returns This object as a `JSON` representation
     */
    public toJSON(): object {
        return {
            title: this.title,
            date: this.date,
            detail: this.detail,
        };
    }

    /**
     * Create a new instance from `JSON`
     * @param data The `JSON` data
     * @returns A new `NewsPost` instance
     */
    public static fromJSON(data: object): NewsPost {
        return new NewsPost(data["title"], data["date"], data["detail"]);
    }
}
