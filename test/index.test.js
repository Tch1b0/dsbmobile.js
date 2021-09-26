const should = require("chai").should();
const Dsbmobile = require("../dist/index").Dsbmobile;
const { Entry } = require("../dist/entry");
const nock = require("nock");
const fs = require("fs");

const sampleHtml = fs.readFileSync("test/sample", { encoding: "utf-8" });

var entries;

describe("Test DSBmobile Wrapper", () => {
	before(() => {
		nock("https://mobileapi.dsbcontrol.de")
			.get("/authid")
			.query(true)
			.reply(200, "1234")
			.get("/dsbtimetables")
			.query(true)
			.reply(200, [{ Childs: [{ Detail: "https://test.com/" }] }]);
		nock("https://test.com").get("/").reply(200, sampleHtml);
	});
	it("Get default timetable and use entries", async () => {
		const ds = new Dsbmobile(
			"testUser",
			"testPassword",
			"https://mobileapi.dsbcontrol.de",
			"1234"
		);
		const t = await ds.getTimetable();

		// Test Entries
		const entry = t.entries[0];
		entry.should.be.instanceOf(Entry);
		entry.realTime.should.be.instanceOf(Date);
		entry.period.should.not.be.instanceOf(String);
		entry.exactDateAndTime.should.be.instanceOf(Date);

		const otherEntry = t.entries[2];
		otherEntry.oldSubject.should.eq("CH");
		otherEntry.longOldSubject.should.eq("Chemie");

		const someCertainEntry = t.findByClassName("TGM11/1");
		someCertainEntry.should.be.instanceOf(Array);

		return;
	});
});
