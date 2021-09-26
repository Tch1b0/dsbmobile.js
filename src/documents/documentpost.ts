import { parseDate } from "../utility";

export class DocumentPost {
	constructor(
		public readonly id: string,
		public readonly title: string,
		public readonly date: Date,
		public readonly url: string,
		public readonly previewUrl: string
	) {}

	public static fromJSON(json: object): DocumentPost {
		let date = parseDate(json["Date"]);
		let previewUrl = `https://light.dsbcontrol.de/DSBlightWebsite/Data/${json["Preview"]}`;

		return new DocumentPost(
			json["Id"],
			json["Title"],
			date,
			json["Detail"],
			previewUrl
		);
	}
}
