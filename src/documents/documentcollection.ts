import { DocumentPost } from "./documentpost";

export class DocumentPostCollection {
	constructor(public readonly posts: DocumentPost[]) {}

	/**
	 * Find a cetrtain `DocumentPost` by its title
	 * @param title The title you want to search for
	 * @returns An Array of `DocumentsPost`s
	 */
	public findByTitle(title: string): DocumentPost[] {
		return this.posts.filter((post) => post.title === title);
	}

	/**
	 * Find a certain `DocumentPost` by its id
	 * @param id The id you want to search for
	 * @returns An Array of `DocumentsPost`s
	 */
	public findById(id: string): DocumentPost[] {
		return this.posts.filter((post) => post.id === id);
	}

	/**
	 * Find a certain `DocumentPost` by its date
	 * @param date The date you want to search for
	 * @returns An Array of `DocumentsPost`s
	 */
	public findByDate(date: Date): DocumentPost[] {
		return this.posts.filter(
			(post) =>
				post.date.getFullYear() === date.getFullYear() &&
				post.date.getMonth() === date.getMonth() &&
				post.date.getDay() === date.getDay()
		);
	}

	/**
	 * Find a certain `DocumentPost` by its url
	 * @param url The url you want to search for
	 * @returns An Array of `DocumentPost`s
	 */
	public findByUrl(url: string): DocumentPost[] {
		return this.posts.filter((post) => post.url === url);
	}

	/**
	 * Find a certain `DocumentPost` by its preview url
	 * @param previewUrl The preview url you want to search for
	 * @returns An Array of `DocumentPost`s
	 */
	public findByPreview(previewUrl: string): DocumentPost[] {
		return this.posts.filter((post) => post.previewUrl === previewUrl);
	}

	public toJSON(): object {
		return { posts: this.posts };
	}

	public static fromJSON(data: object): DocumentPostCollection {
		let posts: DocumentPost[] = [];
		for (let post of data["posts"]) {
			posts.push(DocumentPost.fromJSON(post));
		}

		return new DocumentPostCollection(posts);
	}
}
