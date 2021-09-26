import { parseDate } from "../utility";

export class DocumentPost {
	constructor(
		public readonly id: string,
		public readonly title: string,
		public readonly date: Date,
		public readonly url: string,
		public readonly previewUrl: string
	) {}

	public static fromApiResponse(data: object): DocumentPost {
		let date = parseDate(data["Date"]);
		let previewUrl = `https://light.dsbcontrol.de/DSBlightWebsite/Data/${data["Preview"]}`;

		return new DocumentPost(
			data["Id"],
			data["Title"],
			date,
			data["Detail"],
			previewUrl
		);
	}

	public toJSON(): object {
		return {
			id: this.id,
			title: this.title,
			date: this.date,
			url: this.url,
			"preview-url": this.previewUrl,
		};
	}

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
