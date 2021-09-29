import { UnknownSubject } from "..";

export class Entry {
	constructor(
		public readonly date: Date,
		public readonly day: string,
		public readonly className: string[],
		public readonly period: number,
		public readonly type: string,
		public readonly oldSubject: string,
		public readonly newSubject: string,
		public readonly oldRoom: string,
		public readonly newRoom: string,
		public readonly description: string
	) {}

	/**
	 * The entry only holds a `period` attribute, which does
	 * not represent actual time.
	 * This function gives you the real time of the lesson
	 *
	 * @returns Real time of the lesson
	 */
	get realTime(): Date {
		const periodToTime = {
			1: new Date(0, 0, 0, 7, 30),
			2: new Date(0, 0, 0, 8, 15),
			3: new Date(0, 0, 0, 9, 20),
			4: new Date(0, 0, 0, 10, 5),
			5: new Date(0, 0, 0, 11, 0),
			6: new Date(0, 0, 0, 11, 45),
			7: new Date(0, 0, 0, 12, 45),
			8: new Date(0, 0, 0, 13, 30),
			9: new Date(0, 0, 0, 14, 15),
			10: new Date(0, 0, 0, 15, 10),
			11: new Date(0, 0, 0, 16, 0),
			12: new Date(0, 0, 0, 16, 45),
			13: new Date(0, 0, 0, 17, 35),
			14: new Date(0, 0, 0, 18, 20),
			15: new Date(0, 0, 0, 19, 15),
			16: new Date(0, 0, 0, 20, 0),
			17: new Date(0, 0, 0, 20, 45),
		};

		return periodToTime[this.period];
	}

	/**
	 * This property returns a Date object, that represents the exact
	 * Day, month, year, hour and minute of the lesson
	 */
	get exactDateAndTime(): Date {
		let exactDate = this.date;
		let lessonTime = this.realTime;
		exactDate.setMinutes(lessonTime.getMinutes());
		exactDate.setHours(lessonTime.getHours());

		return exactDate;
	}

	/**
	 * The `newSubject` property is only the short of the subject.
	 * Here you get the full name of a subject, e.g:
	 * ```
	 *
	 * // entry.newSubject = "E"
	 *
	 * entry.longNewSubject()
	 * // -> Englisch
	 * ```
	 *
	 */
	get longNewSubject(): string {
		return this.longSubjectName(this.newSubject);
	}

	/**
	 * The `oldSubject` property is only the short of the subject.
	 * Here you get the full name of a subject, e.g:
	 * ```
	 *
	 * // entry.oldSubject = "WI"
	 *
	 * entry.longOldSubject()
	 * // -> Wirtschaft
	 * ```
	 *
	 */
	get longOldSubject(): string {
		return this.longSubjectName(this.oldSubject);
	}

	private longSubjectName(subjectShort: string): string {
		const subjectShorts = {
			D: "Deutsch",
			E: "Englisch",
			WI: "Wirtschaft",
			GGK: "Geschichte und Gemeinschaftskunde",
			CH: "Chemie",
			S1: "Sport",
			S2: "Sport",
			S3: "Sport",
			S4: "Sport",
			M: "Mathe",
			BK: "Bildende Kunst",
			BK1: "Bildende Kunst",
			BK2: "Bildende Kunst",
			GS: "Global Studies",
			GS1: "Global Studies",
			GS2: "Global Studies",
			PH: "Physik",
			IT: "Informatik",
			INF: "Informationstechnik",
			ITÜS: "IT Softwareentwicklung",
			ITÜH: "IT Hardware",
			EVR1: "Religion",
			EVR2: "Religion",
			ETH1: "Ethik",
			ETH2: "Ethik",
			"SP/B1": "Zweitsprache",
			"SP/B2": "Zweitsprache",
			"SP/B3": "Zweitsprache",
			"SP/B4": "Zweitsprache",
			IFÖM: "Mathe Förderunterricht",
			IFÖE: "Englisch Förderunterricht",
			IFÖD: "Deutsch Förderunterricht",
		};

		let subjectLong = subjectShorts[subjectShort];

		if (subjectLong === undefined) {
			throw new UnknownSubject();
		}

		return subjectLong;
	}

	/**
	 * @returns This object as a `JSON` representation
	 */
	public toJSON(): object {
		return {
			date: this.date,
			day: this.day,
			"class-name": this.className,
			period: this.period,
			type: this.type,
			"old-subject": this.oldSubject,
			"new-subject": this.newSubject,
			"old-room": this.oldRoom,
			"new-room": this.newRoom,
			description: this.description,
		};
	}

	/**
	 * Create a new instance from `JSON`
	 * @param data The `JSON` data
	 * @returns A new `Entry` instance
	 */
	public static fromJSON(data: object): Entry {
		return new Entry(
			data["date"],
			data["day"],
			data["class-name"],
			data["period"],
			data["type"],
			data["old-subject"],
			data["new-subject"],
			data["old-room"],
			data["new-room"],
			data["description"]
		);
	}
}
