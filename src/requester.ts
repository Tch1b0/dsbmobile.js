import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { WrongCredentials } from ".";
import { ServerError } from "./errors";

export class Requester {
	constructor(public readonly axiosInstance: AxiosInstance) {}

	public async get(uri: string, config: AxiosRequestConfig = {}) {
		// Typescript compiler doesn't like it that `resp` is used in the try/catch block
		// thats why the type declaration here is `any`
		let resp: any;

		try {
			resp = await this.axiosInstance.get(uri, config);
		} catch {
			this.processStatusCode(resp.status);
		}

		return resp;
	}

	private processStatusCode(statusCode: number) {
		if (statusCode.toString().startsWith("5")) {
			throw new ServerError();
		} else if (statusCode == 401) {
			throw new WrongCredentials();
		}
	}
}
