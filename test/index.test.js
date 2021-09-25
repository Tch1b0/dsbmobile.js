const should = require("chai").should();
const nock = require("nock");

const dsbmobile = require("../dist/index");

const baseURL = "dsbmobile.";

describe("Test DSBmobile Wrapper", () => {
	it("Get default timetable", (done) => {
		nock("https://app.dsbcontrol.de")
			.post("/JsonHandler.ashx/GetData")
			.reply(200, {});
	});
});
