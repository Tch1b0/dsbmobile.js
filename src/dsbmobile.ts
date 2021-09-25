import { TimeTable, WrongCredentials } from ".";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class Dsbmobile {
	requester: AxiosInstance;
	token!: string;

	constructor(
		public readonly id: string,
		public readonly password: string,
		baseURL: string = "https://mobileapi.dsbcontrol.de"
	) {
		this.requester = axios.create({
			baseURL,
		});

		this.requester
			.get(
				"/authid?bundleid=de.heinekingmedia.dsbmobile&appversion=35&osversion=22&pushid" +
					`&user=${this.id}&password=${this.password}`
			)
			.then((res) => {
				this.token = res.data;
				console.log(res);
				console.log("\n\n\n-----------\n\n\n");
			})
			.catch((_err) => {
				throw WrongCredentials;
			});
	}

	async fetch(): Promise<TimeTable> {
		if (this.token.length == 0) {
			throw new WrongCredentials();
		}

		let resp: AxiosResponse;

		try {
			resp = await this.requester.get(
				`/dsbtimetables?authid=${this.token}`
			);
		} catch (e) {
			throw new WrongCredentials();
		}

		return resp.data;
	}
}
