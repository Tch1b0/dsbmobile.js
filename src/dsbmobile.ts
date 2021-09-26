import {
	DocumentPost,
	DocumentPostCollection,
	MissingToken,
	NewsPostCollection,
	TimeTable,
	WrongCredentials,
} from ".";
import axios, { AxiosResponse } from "axios";
import { NewsPost } from "./news/newspost";
import { Requester } from "./requester";

export class Dsbmobile {
	requester: Requester;
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
		let axiosInstance = axios.create({
			baseURL,
		});

		this.requester = new Requester(axiosInstance);

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
		let resp = await this.requester.get(
			`/dsbtimetables?authid=${this.token}`
		);

		let ttURL = resp.data[0]["Childs"][0]["Detail"];

		resp = await this.requester.get(ttURL);

		return TimeTable.fromHtml(resp.data);
	}

	/**
	 * Get your current **NewsTab**
	 * @returns A new `NewsPostCollection`
	 */
	public async getNewsPosts(): Promise<NewsPostCollection> {
		let resp = await this.requester.get(`/newstab?authid=${this.token}`);

		let news: NewsPost[] = [];

		for (let raw_news of resp.data) {
			news.push(NewsPost.fromApiResponse(raw_news));
		}

		return new NewsPostCollection(news);
	}

	public async getDocumentPosts(): Promise<DocumentPostCollection> {
		let resp = await this.requester.get(
			`/dsbdocuments?authid=${this.token}`
		);

		let documents: DocumentPost[] = [];
		console.log(resp.data);
		for (let i of resp.data) {
			for (let rawPost of i["Childs"]) {
				documents.push(DocumentPost.fromApiResponse(rawPost));
			}
		}

		return new DocumentPostCollection(documents);
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

	public toJSON(): object {
		return {
			id: this.id,
			password: this.password,
			"base-url": this.baseURL,
			token: this.token,
		};
	}

	public static fromJSON(data: object): Dsbmobile {
		return new Dsbmobile(
			data["id"],
			data["password"],
			data["base-url"],
			data["token"]
		);
	}
}
