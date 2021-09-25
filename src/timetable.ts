import { Entry } from "./entry";
import cheerio, { Cheerio } from "cheerio";

export class TimeTable {
	constructor(public readonly entries: Array<Entry>) {}

	static fromHtml(raw_html: string) {
		const $ = cheerio.load(raw_html);

		let centers = $("center");
		var entries: Array<Entry> = [];

		for (let center of centers) {
			if (center.children.length <= 1) {
				continue;
			}
			var day = $(center)
				.find(".mon_title")
				.text()
				.replace(",", "")
				.split(" ")[1];

			for (let row of $(center).find("tr")) {
				if ($(row).find("th").length !== 0) continue;

				let columns = $(row).find("td");

				entries.push(
					new Entry(
						day,
						$(columns[0]).text().split(" "),
						$(columns[1]).text(),
						$(columns[2]).text(),
						$(columns[3]).text(),
						$(columns[4]).text(),
						$(columns[5]).text(),
						$(columns[6]).text(),
						$(columns[7]).text()
					)
				);
			}
		}

		return new TimeTable(entries);
	}
}
