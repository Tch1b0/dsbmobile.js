export class Entry {
	constructor(
		public readonly day: string,
		public readonly class_name: string[],
		public readonly subject: string,
		public readonly type: string,
		public readonly old_subject: string,
		public readonly new_subject: string,
		public readonly old_room: string,
		public readonly new_room: string,
		public readonly description: string
	) {}
}
