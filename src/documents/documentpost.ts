import { parseDate } from "../utility";

export class DocumentPost {
	/**
	 * The URL for the preview
	 */
	public readonly previewURL: string;
	/**
	 * The URL for the preview
	 * @deprecated Use `previewURL` instead
	 */
	public readonly previewUrl: string;

	constructor(
		public readonly id: string,
		public readonly title: string,
		public readonly date: Date,
		public readonly url: string,
		previewURL: string
	) {
		this.previewURL = previewURL;
		this.previewUrl = previewURL;
	}

	/**
	 * Create a new `DocumentPost` from the json structure of the dsb backend
	 * @param data The `JSON` data
	 * @returns A new `DocumentPost` instance
	 */
	public static fromApiResponse(data: object): DocumentPost {
		let date = parseDate(data["Date"]);
		let previewURL = `https://light.dsbcontrol.de/DSBlightWebsite/Data/${data["Preview"]}`;

		return new DocumentPost(
			data["Id"],
			data["Title"],
			date,
			data["Detail"],
			previewURL
		);
	}

	/**
	 * @returns This object as a `JSON` representation
	 */
	public toJSON(): object {
		return {
			id: this.id,
			title: this.title,
			date: this.date,
			url: this.url,
			"preview-url": this.previewURL,
		};
	}

	/**
	 * Create a new instance from `JSON`
	 * @param data The `JSON` data
	 * @returns A new DocumentPost
	 */
	public static fromJSON(data: object): DocumentPost {
		return new DocumentPost(
			data["id"],
			data["title"],
			data["date"],
			data["url"],
			data["preview-url"]
		);
	}
}
