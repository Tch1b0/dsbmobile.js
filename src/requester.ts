import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { WrongCredentials } from ".";

export class Requester {
	constructor(public readonly axiosInstance: AxiosInstance) {}

	public async get(uri: string, config: AxiosRequestConfig = {}) {
		var resp: AxiosResponse;

		try {
			resp = await this.axiosInstance.get(uri, config);
		} catch {
			throw new WrongCredentials();
		}

		return resp;
	}
}
