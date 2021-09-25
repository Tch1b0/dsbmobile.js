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
			})
			.catch((_err) => {
				throw WrongCredentials;
			});
	}

	async fetch() {
		if (this.token.length === undefined) {
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

		let ttURL = resp.data[0]["Childs"][0]["Detail"];

		resp = await this.requester.get(ttURL);

		return TimeTable.fromHtml(resp.data);
	}
}
