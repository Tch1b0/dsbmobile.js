import { parseDate } from "../utility";

export class NewsPost {
	constructor(
		public readonly title: string,
		public readonly date: Date,
		public readonly detail: string
	) {}

	/**
	 * Create a `NewsPost` object from JSON
	 * @param json The json object you want to generate a `NewsPost` from
	 * @returns A new `NewsPost`
	 */
	public static fromApiResponse(json: object): NewsPost {
		let date = parseDate(json["Date"]);

		return new NewsPost(json["title"], date, json["detail"]);
	}

	public toJSON(): object {
		return {
			title: this.title,
			date: this.date,
			detail: this.detail,
		};
	}

	public static fromJSON(data: object): NewsPost {
		return new NewsPost(data["title"], data["date"], data["detail"]);
	}
}
