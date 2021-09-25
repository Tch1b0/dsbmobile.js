export class Entry {
	constructor(
		public readonly day: string,
		public readonly className: string[],
		public readonly subject: string,
		public readonly type: string,
		public readonly oldSubject: string,
		public readonly newSubject: string,
		public readonly oldRoom: string,
		public readonly newRoom: string,
		public readonly description: string
	) {}
}
