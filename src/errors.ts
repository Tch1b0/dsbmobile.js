export class WrongCredentials extends Error {
	constructor() {
		super("Either the username or the password was wrong.");
	}
}

export class MissingToken extends Error {
	constructor() {
		super(
			"There was no Token found. If you called this method just before creating an API ressource, you may have to wait until it is finished."
		);
	}
}
