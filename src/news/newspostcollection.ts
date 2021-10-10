import { NewsPost } from ".";

/**
 * The resource **NewsPostCollection**.
 *
 * Used to interact with the `NewsPost`s
 */
export class NewsPostCollection {
	/**
	 * The `NewsPost`s
	 */
	public readonly posts: NewsPost[];

	/**
	 * The `NewsPost`s
	 * @deprecated Use `posts` instead
	 */
	public readonly news: NewsPost[];

	constructor(posts: NewsPost[]) {
		this.posts = posts;
		this.news = posts;
	}

	/**
	 * Find `NewsPost`s by their title
	 * @param title The title you want to search for
	 * @returns An array of `NewsPost`s
	 */
	public findByTitle(title: string): NewsPost[] {
		return this.posts.filter((news) => news.title === title);
	}

	/**
	 * Find a `NewsPost`s by their date
	 * @param date The date you want to search for
	 * @returns An Array of `NewsPost`s
	 */
	public findByDate(date: Date): NewsPost[] {
		return this.posts.filter(
			(news) =>
				news.date.getFullYear() === date.getFullYear() &&
				news.date.getMonth() === date.getMonth() &&
				news.date.getDay() === date.getDay()
		);
	}

	/**
	 * Find a `NewsPost` by its content/detail
	 * @param detail The detail/content you want to search for
	 * @returns An array of `NewsPost`s
	 */
	public findByDetail(detail: string): NewsPost[] {
		return this.posts.filter((news) => news.detail === detail);
	}

	/**
	 * @returns This object as a `JSON` representation
	 */
	public toJSON(): object {
		return {
			posts: this.posts,
		};
	}

	/**
	 * Create a new instance from `JSON`
	 * @param data The `JSON` data
	 * @returns A new `NewsPostCollection`
	 */
	public static fromJSON(data: object): NewsPostCollection {
		let postArr: NewsPost[] = [];
		for (let posts of data["posts"]) {
			postArr.push(NewsPost.fromJSON(posts));
		}

		return new NewsPostCollection(postArr);
	}
}
