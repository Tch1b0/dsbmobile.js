import { NewsPost } from ".";

/**
 * The ressource **NewsPostCollection**.
 *
 * Used to interact with the `NewsPost`s
 */
export class NewsPostCollection {
	constructor(public readonly news: NewsPost[]) {}

	/**
	 * Find `NewsPost`s by their title
	 * @param title The title you want to search for
	 * @returns An array of `NewsPost`s
	 */
	public findByTitle(title: string): NewsPost[] {
		return this.news.filter((news) => news.title === title);
	}

	/**
	 * Find a `NewsPost`s by their date
	 * @param date The date you want to search for
	 * @returns An Array of `NewsPost`s
	 */
	public findByDate(date: Date): NewsPost[] {
		return this.news.filter(
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
		return this.news.filter((news) => news.detail === detail);
	}
}
