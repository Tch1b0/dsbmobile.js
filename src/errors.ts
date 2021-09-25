export class WrongCredentials extends Error {
	constructor() {
		super("Either the username or the password was wrong.");
	}
}
