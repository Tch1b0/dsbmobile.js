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

	private longSubjectName(subject: string): string {
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
			GS: "Global Studies",
			PH: "Physik",
			IT: "Informationstechnik",
			ITÜS: "IT Softwareentwicklung",
			ITÜH: "IT Hardware",
		};

		return subjectShorts[subject];
	}
}
