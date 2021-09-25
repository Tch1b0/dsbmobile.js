import { Entry } from "./entry";
import cheerio from "cheerio";

/**
 * The time table ressource
 */
export class TimeTable {
	constructor(public readonly entries: Array<Entry>) {}

	/**
	 * Find a certain time table entry by the class
	 * @param className The class name you want to search for
	 * @returns Either one Entry, multiple Entries or undefined
	 */
	findByClassName(className: string): Entry | Entry[] | undefined {
		return this.entries.find((entry) =>
			entry.className.includes(className)
		);
	}

	/**
	 * Create a new `TimeTable` from HTML
	 * @param rawHtml The raw html string
	 * @returns A new `TimeTable` ressource
	 */
	static fromHtml(rawHtml: string) {
		const $ = cheerio.load(rawHtml);

		var centers = $("center");
		var entries: Array<Entry> = [];

		for (var center of centers) {
			if (center.children.length <= 1) {
				continue;
			}
			var day = $(center)
				.find(".mon_title")
				.text()
				.replace(",", "")
				.split(" ")[1];

			for (var row of $(center).find("tr")) {
				if ($(row).find("th").length !== 0) continue;

				var columns = $(row).find("td");

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
