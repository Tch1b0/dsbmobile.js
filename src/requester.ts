import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { WrongCredentials } from "@";
import { ServerError, UnknownFetchError } from "@/errors";

/**
 * The requester used to make requests to the dsbmobile-api
 */
export class Requester {
    constructor(public readonly axiosInstance: AxiosInstance) {}

    /**
     * Get a certain resource
     * @param uri The uri to send the request to
     * @param config The axios-config to apply
     * @returns The axios-response
     * @throws `ServerError`, `WrongCredentials` or `UnknownFetchError` when something goes wrong
     */
    public async get(uri: string, config: AxiosRequestConfig = {}) {
        try {
            return await this.axiosInstance.get(uri, config);
        } catch (error: any) {
            const statusCode = error.response.status;
            this.processStatusCode(statusCode);
            throw new UnknownFetchError(statusCode);
        }
    }

    private processStatusCode(statusCode: number) {
        if (statusCode.toString().startsWith("5")) {
            throw new ServerError();
        } else if (statusCode == 401) {
            throw new WrongCredentials();
        }
    }
}
