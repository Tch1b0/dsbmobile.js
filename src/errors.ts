export class WrongCredentials extends Error {
	constructor() {
		super("either the username or the password was wrong.");
	}
}

export class MissingToken extends Error {
	constructor() {
		super(
			"there was no Token found. If you called this method just before creating an API ressource, you may have to wait until it is finished."
		);
	}
}

export class UnknownSubject extends Error {
	constructor() {
		super(
			"the Subject you are looking for isn't registered yet. Please contact one of the contribtors of the project"
		);
	}
}
