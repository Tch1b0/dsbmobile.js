import {
	MissingToken,
	NewsPostCollection,
	TimeTable,
	WrongCredentials,
} from ".";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { NewsPost } from "./news/newspost";

export class Dsbmobile {
	requester: AxiosInstance;
	token!: string;

	/**
	 * Create a new DSBmobile wrapper
	 * You need to wait a short time after creating an instance of this,
	 * because the token needs to be fetched.
	 * You can also call `fetchToken()` by yourself.
	 *
	 * @param id Your DSBmobile ID
	 * @param password Your DSBmobile Password
	 * @param baseURL
	 */
	constructor(
		public readonly id: string,
		public readonly password: string,
		public readonly baseURL: string = "https://mobileapi.dsbcontrol.de",
		token?: string
	) {
		this.requester = axios.create({
			baseURL,
		});

		if (token === undefined) {
			this.fetchToken();
		} else {
			this.token = token;
		}
	}

	/**
	 * Get your current **Timetable**
	 * @returns A new `TimeTable` ressource
	 * @throws
	 */
	public async getTimetable(): Promise<TimeTable> {
		if (this.token.length === undefined) {
			throw new MissingToken();
		}

		let resp: AxiosResponse;

		try {
			resp = await this.requester.get(
				`/dsbtimetables?authid=${this.token}`
			);
		} catch {
			throw new WrongCredentials();
		}

		let ttURL = resp.data[0]["Childs"][0]["Detail"];

		resp = await this.requester.get(ttURL);

		return TimeTable.fromHtml(resp.data);
	}

	/**
	 * Get your current **NewsTab**
	 * @returns A new `NewsPostCollection`
	 */
	public async getNewsPosts(): Promise<NewsPostCollection> {
		let resp: AxiosResponse;

		try {
			resp = await this.requester.get(`/newstab?authid=${this.token}`);
		} catch {
			throw WrongCredentials;
		}

		let news: NewsPost[] = [];

		for (let raw_news of resp.data) {
			news.push(NewsPost.fromJSON(raw_news));
		}

		return new NewsPostCollection(news);
	}

	/**
	 * Fetch your token.
	 * The token is stored in this object
	 */
	public async fetchToken() {
		let res: AxiosResponse;

		try {
			res = await this.requester.get(
				"/authid?bundleid=de.heinekingmedia.dsbmobile&appversion=35&osversion=22&pushid" +
					`&user=${this.id}&password=${this.password}`
			);
		} catch (e) {
			throw new WrongCredentials();
		}

		this.token = res.data;
	}
}
