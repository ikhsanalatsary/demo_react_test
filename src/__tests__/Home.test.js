import React from "react";
import { cleanup, render, waitForElement } from "@testing-library/react";
import axios from "axios";
import Home from "../Home";

const fakeData = {
  status: "ok",
  totalResults: 2502,
  articles: [
    {
      source: {
        id: "abc-news-au",
        name: "ABC News (AU)"
      },
      author: "Stephanie Dalzell",
      title:
        "Anthony Albanese to take aim at social media giants, accusing them of robbing politics of civility",
      description:
        "Labor leader Anthony Albanese will take a swing at Facebook in his last major speech of the political year, accusing the social media giant of being complacent with false information.",
      url:
        "https://www.abc.net.au/news/2019-12-07/anthony-albanese-to-take-a-swipe-at-facebook/11775490",
      urlToImage: "https://www.abc.net.au/news/image/11744806-16x9-700x394.jpg",
      publishedAt: "2019-12-06T13:30:59Z",
      content:
        "Posted \r\nDecember 07, 2019 00:30:59\r\nFederal Labor leader Anthony Albanese will take a swing at Facebook in his last major speech of the political year, accusing the social media giant of being complacent with false information.\r\nKey points:\r\n<ul><li>Anthony … [+3285 chars]"
    },
    {
      source: {
        id: "abc-news-au",
        name: "ABC News (AU)"
      },
      author: "Sian Johnson And Sarah Jane Bell",
      title:
        "Highway upgrade stalls again after court upholds appeal over sacred trees",
      description:
        "The project to duplicate the Western Highway between Ballarat and Stawell has faced a string of delays, including those caused by protests focusing on a 12.5km stretch that would require cutting down thousands of trees.",
      url:
        "https://www.abc.net.au/news/2019-12-06/highway-upgrade-stalls-again-court-upholds-appeal-sacred-trees/11773142",
      urlToImage: "https://www.abc.net.au/news/image/11773960-16x9-700x394.jpg",
      publishedAt: "2019-12-06T07:59:10Z",
      content:
        "Posted \r\nDecember 06, 2019 18:59:10\r\nAn ongoing battle over the duplication of a highway in western Victoria held up over concerns about its impact on sacred trees is set to continue, following a Federal Court decision.\r\nKey points:\r\n<ul><li>The $672m project… [+5925 chars]"
    },
    {
      source: {
        id: "abc-news-au",
        name: "ABC News (AU)"
      },
      author: null,
      title:
        "Police kill suspects in Indian gang-rape case during crime scene reconstruction",
      description:
        "Indian police shoot dead four men in custody who were suspected of raping and killing a 27-year-old veterinarian in the city of Hyderabad, drawing applause from her family and citizens outraged over crimes against women.",
      url:
        "https://www.abc.net.au/news/2019-12-06/indian-police-fatally-shoot-four-in-gang-rape-case/11775470",
      urlToImage: "https://www.abc.net.au/news/image/11775828-16x9-700x394.jpg",
      publishedAt: "2019-12-06T07:43:48Z",
      content:
        "Posted \r\nDecember 06, 2019 18:43:48\r\nIndian police have shot dead four men who were suspected of raping and killing a 27-year-old veterinarian in the city of Hyderabad, drawing applause from her family and citizens outraged over crimes against women.\r\nKey poi… [+4087 chars]"
    },
    {
      source: {
        id: "abc-news-au",
        name: "ABC News (AU)"
      },
      author: null,
      title: "Fire near Lowood",
      description:
        'The Queensland Police Service had issued an emergency declaration for the "dangerous fire".',
      url: "https://www.abc.net.au/news/2019-12-06/fire-near-lowood/11775904",
      urlToImage: "https://www.abc.net.au/news/image/11775912-16x9-700x394.jpg",
      publishedAt: "2019-12-06T07:23:17Z",
      content:
        "This service may include material from Agence France-Presse (AFP), APTN, Reuters, AAP, CNN and the BBC World Service which is copyright and cannot be reproduced.\r\nAEDT = Australian Eastern Daylight Savings Time which is 11 hours ahead of GMT (Greenwich Mean T… [+3 chars]"
    },
    {
      source: {
        id: "abc-news-au",
        name: "ABC News (AU)"
      },
      author: null,
      title:
        "'It's like a miracle': British hiker revived after six-hour cardiac arrest",
      description:
        "The low mountain temperatures that almost killed Audrey Schoeman by putting her into hypothermic cardiac arrest for hours, also helped to save her life.",
      url:
        "https://www.abc.net.au/news/2019-12-06/british-hiker-aubrey-schoeman-survives-six-hour-cardiac-arrest/11775290",
      urlToImage: "https://www.abc.net.au/news/image/11775862-16x9-700x394.jpg",
      publishedAt: "2019-12-06T07:21:59Z",
      content:
        "Updated \r\nDecember 06, 2019 18:51:31\r\nA 34-year-old British hiker has been revived in Spain after a six-hour cardiac arrest brought on by severe hypothermia, with the low mountain temperatures that made her ill also helping to save her life.\r\n<ul><li>Audrey S… [+2585 chars]"
    }
  ]
};

describe("<Home />", () => {
  afterEach(cleanup);
  describe("Success Mock", () => {
    let mock;
    beforeAll(() => {
      mock = jest.spyOn(axios, "get").mockResolvedValue({ data: fakeData });
    });

    afterAll(() => {
      mock.mockRestore();
    });

    test("should render NewsItem as expected", async () => {
      const cp = render(<Home />);
      const loading = cp.getByTestId("loading");
      console.log(loading);
      expect(loading).toBeDefined();

      const content = await waitForElement(() =>
        cp.getAllByTestId("article-title")
      );
      expect(cp.queryByTestId("loading")).toEqual(null);

      expect(content).toHaveLength(fakeData.articles.length);
      // expect(cp.asFragment()).toMatchSnapshot();
    });
  });

  describe("Success Mock with empty data", () => {
    let mock;
    beforeAll(() => {
      mock = jest
        .spyOn(axios, "get")
        .mockResolvedValue({ data: { articles: [] } });
    });

    afterAll(() => {
      mock.mockRestore();
    });

    test("should render empty", async () => {
      const cp = render(<Home />);
      const loading = cp.getByTestId("loading");
      console.log(loading);
      expect(loading).toBeDefined();

      const content = await waitForElement(() =>
        // cp.getByTestId("wrapper-news")
        cp.queryAllByTestId("article-title")
      );

      console.log(content);
      expect(content).toHaveLength(0);
    });
  });

  describe("Error Mock", () => {
    let fakeError = {
      status: "error",
      code: "apiKeyDisabled",
      message: "Your API key has been disabled"
    };
    let mock;
    beforeAll(() => {
      mock = jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.reject(fakeError));
    });

    afterAll(() => {
      mock.mockRestore();
    });

    test("should render NewsItem as expected", async () => {
      const cp = render(<Home />);
      const loading = cp.getByTestId("loading");
      console.log(loading);
      expect(loading).toBeDefined();

      const content = await waitForElement(() => cp.getByTestId("error"));
      expect(cp.queryByTestId("loading")).toEqual(null);
      expect(content).toBeDefined();
      expect(content.textContent).toBe(fakeError.message);
    });
  });
});
