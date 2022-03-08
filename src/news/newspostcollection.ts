import { NewsPost } from "@/news";

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
     * find `NewsPost`s by their title
     * @param title the title you want to search for
     * @returns an array of `NewsPost`s
     */
    public findByTitle(title: string): NewsPost[] {
        return this.posts.filter((news) => news.title === title);
    }

    /**
     * find a `NewsPost`s by their date
     * @param date the date you want to search for
     * @returns an Array of `NewsPost`s
     */
    public findByDate(date: Date): NewsPost[] {
        return this.posts.filter(
            (news) =>
                news.date.getFullYear() === date.getFullYear() &&
                news.date.getMonth() === date.getMonth() &&
                news.date.getDay() === date.getDay(),
        );
    }

    /**
     * find a `NewsPost` by its content/detail
     * @param detail the detail/content you want to search for
     * @returns an array of `NewsPost`s
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
     * create a new instance from `JSON`
     * @param data the `JSON` data
     * @returns a new `NewsPostCollection`
     */
    public static fromJSON(data: object): NewsPostCollection {
        const postArr: NewsPost[] = [];
        for (const posts of data["posts"]) {
            postArr.push(NewsPost.fromJSON(posts));
        }

        return new NewsPostCollection(postArr);
    }
}
