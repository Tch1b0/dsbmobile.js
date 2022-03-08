import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { WrongCredentials } from "@";
import { ServerError, UnknownFetchError } from "@/errors";

export class Requester {
    constructor(public readonly axiosInstance: AxiosInstance) {}

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
