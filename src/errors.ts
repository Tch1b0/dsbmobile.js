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
            "there was no Token found. If you called this method just before creating an API resource, you may have to wait until it is finished.",
        );
    }
}

/**
 * Thrown if a subject-short is not known
 */
export class UnknownSubject extends Error {
    constructor(subject: string) {
        super(
            `the Subject "${subject}" wasn't registered yet. Please contact one of the contributors of the project. The repository: https://github.com/Tch1b0/dsbmobile.js`,
        );
    }
}

export class ServerError extends Error {
    constructor() {
        super("the API Server ran into some issues");
    }
}

export class UnknownFetchError extends Error {
    constructor() {
        super(
            "something went wrong while trying to fetch data. Are you sure you entered the right credentials?",
        );
    }
}
