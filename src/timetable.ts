import { Entry } from "./entry";
import { DOMParser } from "xmldom";

export class TimeTable {
	constructor(public readonly entries: Array<Entry>) {}

	static fromHtml(html: string) {
		var doc = new DOMParser().parseFromString(html, "text/html");

		var entries: Array<Entry> = [];

		for (var i = 0; i < doc.getElementsByTagName("center").length; i++) {
			let centerTag = doc.getElementsByTagName("center")[i];

			console.log("CHECKPOINT 1 - " + centerTag.firstChild);

			if (
				!centerTag.firstChild ||
				centerTag.firstChild.nodeName !== "div"
			) {
				continue;
			}

			var day: string = "";

			for (var j = 0; j < centerTag.children.length; j++) {
				console.log("CHECKPOINT 2");

				let child = centerTag.children[j];
				let childClass = child.className;

				// <div class="mon_title">
				if (childClass === "mon_title") {
					let raw_text = centerTag.children[j].innerHTML;
					let text = raw_text.split(" ");
					day = text[1];
				}

				// <div class="mon_list">
				if (childClass === "mon_list") {
					console.log("CHECKPOINT 3");

					// <tbody>
					let schedule = child.children[0];

					// <tr class="list ...">
					for (var e = 0; e < schedule.children.length; e++) {
						let rawEntry = schedule.children[e];

						if (rawEntry.classList.length == 1) {
							continue;
						}

						// Entry Children
						let ec = rawEntry.children;

						entries.push(
							new Entry(
								day,
								ec[0].innerHTML.split(" "),
								ec[1].innerHTML,
								ec[2].innerHTML,
								ec[3].innerHTML,
								ec[4].innerHTML,
								ec[5].innerHTML,
								ec[6].innerHTML,
								ec[7].innerHTML
							)
						);
					}
				}
			}
		}

		return new TimeTable(entries);
	}
}
