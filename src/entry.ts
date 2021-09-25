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
	 * This function gives you the real time of the entry
	 *
	 * @returns Real time of the entry
	 */
	public getTime(): Date {
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
}
