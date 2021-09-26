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
	public static fromJSON(json: object): NewsPost {
		let raw_date = Date.parse(json["date"]);
		let date = new Date(raw_date);

		return new NewsPost(json["title"], date, json["detail"]);
	}
}
