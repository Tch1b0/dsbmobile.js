import { expect } from "chai";

import { DocumentPost, Entry, NewsPost } from "../dist";

describe("Test components(classes)", () => {
    it("Create and test Entry", () => {
        const data = {
            date: new Date(),
            day: "Montag",
            "class-name": ["Test/1"],
            period: 1,
            type: "Vertretung",
            "old-subject": "M",
            "new-subject": "D",
            "old-room": "200",
            "new-room": "300",
            description: "",
        };
        const entry1 = Entry.fromJSON(data);

        expect(JSON.stringify(entry1.toJSON())).to.equal(JSON.stringify(data));
        expect(entry1.longOldSubject).to.be.a("string").and.equal("Mathe");
        expect(entry1.longNewSubject).to.be.a("string").and.equal("Deutsch");

        data["old-subject"] = "This subject does not exist";
        const entry2 = Entry.fromJSON(data);

        try {
            expect(entry2.longNewSubject).to.throw("UnknownSubject");
            throw new Error();
        } catch (e) {
            expect(true).to.equal(true);
        }
    });

    it("Create and test NewsPost", () => {
        const data = {
            title: "Title",
            date: new Date(),
            detail: "Detial",
        };
        const post = NewsPost.fromJSON(data);

        expect(JSON.stringify(post.toJSON())).to.equal(JSON.stringify(data));
        expect(post.title).to.be.a("string").and.equal(data["title"]);
        expect(post.date).to.be.a("date").and.equal(data["date"]);
        expect(post.detail).to.be.a("string").and.equal(data["detail"]);
    });

    it("Create and test DocumentPost", () => {
        const data = {
            id: "Id",
            title: "Title",
            date: new Date(),
            url: "Url",
            "preview-url": "previewURL",
        };
        const post = DocumentPost.fromJSON(data);

        expect(JSON.stringify(post.toJSON())).to.equal(JSON.stringify(data));
        expect(post.id).to.be.a("string").and.equal(data["id"]);
        expect(post.title).to.be.a("string").and.equal(data["title"]);
        expect(post.date).to.be.a("date").and.equal(data["date"]);
        expect(post.url).to.be.a("string").and.equal(data["url"]);
        expect(post.previewURL)
            .to.be.a("string")
            .and.equal(data["preview-url"]);
    });
});
