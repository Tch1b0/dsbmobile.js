import {
	DocumentPost,
	DocumentPostCollection,
	NewsPostCollection,
	TimeTable,
	MissingToken,
} from ".";
import axios, { AxiosResponse } from "axios";
import { NewsPost } from "./news/newspost";
import { Requester } from "./requester";

/**
 * The configuration Object for a `Dsbmobile` instance
 */
export interface DsbmobileConfig {
	/**
	 * The id/username you need to fetch your token
	 */
	id?: string;

	/**
	 * The password you need to fetch your token
	 */
	password?: string;

	/**
	 * The base-url of the dsbmobile API you want to use
	 */
	baseURL?: string;

	/**
	 * The base-url for the dsbmobile-resource API you want to use
	 * @deprecated Use `resourceBaseURL` instead
	 */
	resourceApiURL?: string;

	/**
	 * The base-url for the dsbmobile-resource API you want to use
	 */
	resourceBaseURL?: string;

	/**
	 * The token you need to make requests. Can be fetched when id and password are declared
	 */
	token?: string;
}

export default class Dsbmobile {
	requester: Requester;
	token!: string;
	public readonly id!: string;
	public readonly password!: string;
	public baseURL: string = "https://mobileapi.dsbcontrol.de";
	public resourceBaseURL: string = "https://light.dsbcontrol.de";

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
		resourceBaseURL?: string,
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
		this.id = config.id || this.id;
		this.password = config.password || this.password;
		this.baseURL = config.baseURL || this.baseURL;
		this.resourceBaseURL = config.resourceBaseURL || this.resourceBaseURL;
		this.resourceBaseURL = config.resourceBaseURL || this.resourceBaseURL;
		this.token = config.token || this.token;

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
	 * @throws `MissingToken` if the token isn't declared
	 * @returns A new `TimeTable` resource
	 */
	public async getTimetable(): Promise<TimeTable> {
		this.checkToken();
		let resp = await this.requester.get(
			`/dsbtimetables?authid=${this.token}`
		);

		let resURL: string = resp.data[0]["Childs"][0]["Detail"];
		resURL = resURL.replace(
			"https://light.dsbcontrol.de",
			this.resourceBaseURL
		);

		resp = await this.requester.get(resURL);

		return TimeTable.fromHtml(resp.data);
	}

	/**
	 * Get your current **News Tab**
	 * @throws `MissingToken` if the token isn't declared
	 * @returns A new `NewsPostCollection`
	 */
	public async getNewsPosts(): Promise<NewsPostCollection> {
		this.checkToken();
		let resp = await this.requester.get(`/newstab?authid=${this.token}`);

		let news: NewsPost[] = [];

		for (let raw_news of resp.data) {
			news.push(NewsPost.fromApiResponse(raw_news));
		}

		return new NewsPostCollection(news);
	}

	/**
	 * Get your current **Document Posts**
	 * @throws `MissingToken` if the token isn't declared
	 * @returns A new `DocumentPostCollection`
	 */
	public async getDocumentPosts(): Promise<DocumentPostCollection> {
		this.checkToken();
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
	 * @throws `WrongCredentials` if the credentials aren't right
	 */
	public async fetchToken() {
		let res: AxiosResponse;

		res = await this.requester.get(
			"/authid?bundleid=de.heinekingmedia.dsbmobile&appversion=35&osversion=22&pushid" +
				`&user=${this.id}&password=${this.password}`
		);

		this.token = res.data;
	}

	/**
	 * Check wether the token is existing and throw an Error if not
	 */
	private checkToken() {
		if (this.token === undefined) {
			throw new MissingToken();
		}
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
