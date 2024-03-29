import { expect } from "chai";

import Dsbmobile from "../src";
import { Entry } from "../src";

import nock from "nock";
import fs from "fs";
import newspostSample from "./samples/newspost-sample.json";
import documentpostSample from "./samples/documentpost-sample.json";
const timetableSample = fs.readFileSync("./test/samples/timetable-sample", {
    encoding: "utf-8",
});

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

        // Test Entries
        const entry = t.entries[0];
        expect(entry).to.be.instanceOf(Entry);
        expect(entry.realTime).to.be.instanceOf(Date);
        expect(entry.period).to.not.be.instanceOf(String);
        expect(entry.exactDateAndTime).to.be.instanceOf(Date);

        const otherEntry = t.entries[2];
        expect(otherEntry.oldSubject).to.eq("CH");
        expect(otherEntry.longOldSubject).to.eq("Chemie");

        otherEntry.registerSubjectShorts(
            new Map([["CH", "LONG SUBJECT NAME"]]),
        );
        expect(otherEntry.oldSubject).to.eq("CH");
        expect(otherEntry.longOldSubject).to.eq("LONG SUBJECT NAME");

        t.registerSubjectShorts(new Map([["CH", "OTHER SUBJECT NAME"]]));
        expect(otherEntry.oldSubject).to.eq("CH");
        expect(otherEntry.longOldSubject).to.eq("OTHER SUBJECT NAME");

        const someCertainEntry = t.findByClassName("TGM11/1");
        expect(someCertainEntry).to.be.instanceOf(Array);

        expect(t.findByClassName("TGM11/1")).to.be.a("array");
        expect(t.findByRoom("020")).to.be.a("array");

        expect(t.findBySubjectLong("Chemie")).to.be.a("array");
        expect(t.findBySubjectShort("E")).to.be.a("array");

        expect(
            t.findByClassName("TGM13/1")[0].className,
        ).to.have.length.greaterThan(1);

        const date = t.findByClassName("M4PA1")[0].date;
        expect(["24.9.2021", "9/24/2021"]).to.include(
            date.toLocaleDateString("de-DE"),
        );
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

        expect(newsCollection.posts.length).to.equal(2);
        expect(newsCollection.posts[0]).to.be.a("object");

        expect(newsCollection.findByTitle("Test Title")).to.be.a("array");
        expect(newsCollection.findByDate(new Date())).to.be.a("array");
        expect(newsCollection.findByDetail("Test Detail")).to.be.a("array");
        expect(newsCollection.toJSON()).to.be.a("object");

        expect(["12.4.2021", "4/12/2021"]).to.include(
            newsCollection.posts[0].date.toLocaleDateString("de-DE"),
        );

        expect(["10:30:00", "10:30:00 AM"]).to.include(
            newsCollection.posts[0].date.toLocaleTimeString("de-DE"),
        );
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
    it("Create Dsbmobile instance with other urls", () => {
        const ds = new Dsbmobile({
            id: "testUser",
            password: "testPassword",
            resourceBaseURL: "abc",
            baseURL: "cba",
        })

        expect(ds.resourceBaseURL).to.equal("abc");
        expect(ds.baseURL).to.equal("cba");
    })
});
