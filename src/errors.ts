/**
 * Thrown if the token can not be fetched
 */
export class WrongCredentials extends Error {
	constructor() {
		super("either the username or the password was wrong.");
	}
}

/**
 * Thrown if a request is tried to be made without a token declared
 */
export class MissingToken extends Error {
	constructor() {
		super(
			"there was no Token found. If you called this method just before creating an API ressource, you may have to wait until it is finished."
		);
	}
}

/**
 * Thrown if a subject-short is not known
 */
export class UnknownSubject extends Error {
	constructor() {
		super(
			"the Subject you are looking for isn't registered yet. Please contact one of the contribtors of the project"
		);
	}
}
