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

/**
 * The configuration Object for a `Dsbmobile` instance
 */
export interface DsbmobileConfig {
	id?: string;
	password?: string;
	baseURL?: string;
	resourceApiURL?: string;
	token?: string;
}

export default class Dsbmobile {
	requester: Requester;
	token!: string;
	public readonly id!: string;
	public readonly password!: string;
	public baseURL: string = "https://mobileapi.dsbcontrol.de";
	public resourceApiURL: string = "https://light.dsbcontrol.de";

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
		id?: string,
		password?: string,
		baseURL?: string,
		resourceApiURL?: string,
		token?: string
	);

	/**
	 * Create a new DSBmobile wrapper by passing a config object
	 * @param config The `DsbmobileConfig`
	 */
	constructor(config: DsbmobileConfig);

	constructor(...args: Array<any>) {
		let config: DsbmobileConfig;

		// If the DsbmobileConfig was passed as an argument
		if (args[0] instanceof Object) {
			config = args[0];
		}
		// If the arguments were passed manually
		else {
			config = {
				id: args[0],
				password: args[1],
				baseURL: args[2],
				resourceApiURL: args[3],
				token: args[4],
			} as DsbmobileConfig;
		}

		// Check wether attributes are undefined and adapt them if not
		if (config.id !== undefined) this.id = config.id;
		if (config.password !== undefined) this.password = config.password;
		if (config.baseURL !== undefined) this.baseURL = config.baseURL;
		if (config.resourceApiURL !== undefined)
			this.resourceApiURL = config.resourceApiURL;
		if (config.token !== undefined) this.token = config.token;

		// Create a new Axios instance from the baseURL
		let axiosInstance = axios.create({
			baseURL: this.baseURL,
		});

		// Create a requester from the Axios instance
		this.requester = new Requester(axiosInstance);

		// Fetch the token if it is undefined
		if (this.token === undefined) {
			this.fetchToken();
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

		let resURL: string = resp.data[0]["Childs"][0]["Detail"];
		resURL = resURL.replace(
			"https://light.dsbcontrol.de",
			this.resourceApiURL
		);

		resp = await this.requester.get(resURL);

		return TimeTable.fromHtml(resp.data);
	}

	/**
	 * Get your current **News Tab**
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

	/**
	 * Get your current **Document Posts**
	 * @returns A new `DocumentPostCollection`
	 */
	public async getDocumentPosts(): Promise<DocumentPostCollection> {
		let resp = await this.requester.get(
			`/dsbdocuments?authid=${this.token}`
		);

		let documents: DocumentPost[] = [];

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

	/**
	 * @returns This object as a `JSON` representation
	 */
	public toJSON(): object {
		return {
			id: this.id,
			password: this.password,
			"base-url": this.baseURL,
			token: this.token,
		};
	}

	/**
	 * Create a new instance from `JSON`
	 * @param data The `JSON` data
	 * @returns A new `Dsbmobile` instance
	 */
	public static fromJSON(data: object): Dsbmobile {
		return new Dsbmobile(
			data["id"],
			data["password"],
			data["base-url"],
			data["token"]
		);
	}
}
