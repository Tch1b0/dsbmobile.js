import { expect } from "chai";

import Dsbmobile from "../dist";
import { Entry } from "../dist";

import nock from "nock";
import fs from "fs";
import newspostSample from "./samples/newspost-sample.json";
import documentpostSample from "./samples/documentpost-sample.json";
const timetableSample = fs.readFileSync("./test/samples/timetable-sample", {
	encoding: "utf-8",
});

var entries: Entry[] = [];

describe("Test DSBmobile Wrapper", () => {
	before(() => {
		nock("https://mobileapi.dsbcontrol.de")
			.get("/authid")
			.query(true)
			.reply(200, "1234")
			.get("/dsbtimetables")
			.query(true)
			.reply(200, [{ Childs: [{ Detail: "https://test.com/" }] }]);
		nock("https://test.com").get("/").reply(200, timetableSample);
	});
	it("Get default timetable and use entries", async () => {
		const ds = new Dsbmobile({
			id: "testUser",
			password: "testPassword",
			token: "1234",
		});

		const t = await ds.getTimetable();

		entries = t.entries;
		// Test Entries
		const entry = t.entries[0];
		expect(entry).to.be.instanceOf(Entry);
		expect(entry.realTime).to.be.instanceOf(Date);
		expect(entry.period).to.not.be.instanceOf(String);
		expect(entry.exactDateAndTime).to.be.instanceOf(Date);

		const otherEntry = t.entries[2];
		expect(otherEntry.oldSubject).to.eq("CH");
		expect(otherEntry.longOldSubject).to.eq("Chemie");

		const someCertainEntry = t.findByClassName("TGM11/1");
		expect(someCertainEntry).to.be.instanceOf(Array);

		expect(t.findByClassName("TGM11/1")).to.be.a("array");
		expect(t.findByRoom("020")).to.be.a("array");

		expect(t.findBySubjectLong("Chemie")).to.be.a("array");
		expect(t.findBySubjectShort("E")).to.be.a("array");

		return;
	});

	before(() => {
		nock("https://mobileapi.dsbcontrol.de")
			.get("/newstab")
			.query(true)
			.reply(200, newspostSample);
	});
	it("Get NewsPostCollection", async () => {
		const ds = new Dsbmobile({
			id: "testUser",
			password: "testPassword",
			token: "1234",
		});

		const newsCollection = await ds.getNewsPosts();

		expect(newsCollection.news.length).to.equal(2);
		expect(newsCollection.news[0]).to.be.a("object");

		expect(newsCollection.findByTitle("Test Title")).to.be.a("array");
		expect(newsCollection.findByDate(new Date())).to.be.a("array");
		expect(newsCollection.findByDetail("Test Detail")).to.be.a("array");
		expect(newsCollection.toJSON()).to.be.a("object");
	});

	before(() => {
		nock("https://mobileapi.dsbcontrol.de")
			.get("/dsbdocuments")
			.query(true)
			.reply(200, documentpostSample);
	});
	it("Get DocumentPostCollection", async () => {
		const ds = new Dsbmobile({
			id: "testUser",
			password: "testPassword",
			token: "1234",
		});

		const postCollection = await ds.getDocumentPosts();

		expect(postCollection.posts.length).to.be.equal(2);
		expect(postCollection.posts[0]).to.be.a("object");
		expect(postCollection.findByTitle("Title")).to.be.a("array");
		expect(postCollection.findById("2")).to.be.a("array");
		expect(postCollection.findByPreview("Test")).to.be.a("array");
		expect(postCollection.findByUrl("Test URL")).to.be.a("array");
		expect(postCollection.findByDate(new Date())).to.be.a("array");
		expect(postCollection.toJSON()).to.be.a("object");
	});
});
