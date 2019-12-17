import React from "react";
import { cleanup, render } from "@testing-library/react";
import NewsItem from "../NewsItem";

describe("<NewsItem />", () => {
  afterEach(cleanup);
  test("should render as expected", () => {
    //arrange
    const data = {
      urlToImage:
        "https://www.blackxperience.com/assets/blackattitude/blackstyle/cover-wick-150x150.jpg",
      title: "Test News",
      publishedAt: "2019-12-06T13:30:59Z",
      description: "This is a news test with testing library",
      author: "John Wick"
    };
    // act
    const component = render(<NewsItem article={data} />);
    // assert
    expect(component.getByTestId("article-title").textContent).toBe(data.title);
    expect(component.getByTestId("article-description").textContent).toBe(
      data.description
    );
    expect(component.getByTestId("image-thumbnail").src).toBe(data.urlToImage);
    expect(component.getByTestId("article-date").textContent).toBe("12/6/2019");
    expect(component.getByTestId("article-author").textContent).toBe(
      data.author
    );
  });

  test("should render as expected even without urlToImage is defined", () => {
    //arrange
    const data = {
      urlToImage: null,
      title: "Test News",
      publishedAt: "2019-12-06T13:30:59Z",
      description: "This is a news test with testing library",
      author: "John Wick"
    };
    // act
    const component = render(<NewsItem article={data} />);
    // assert
    expect(component.getByTestId("image-thumbnail").src).toBe(
      "https://rawgit.com/ikhsanalatsary/xcidic-news/8db843f7684624356510c7317d231124bd3dc5fe/src/modules/news/image.png"
    );
  });

  test("should render as expected even without author is defined", () => {
    //arrange
    const data = {
      urlToImage:
        "https://www.blackxperience.com/assets/blackattitude/blackstyle/cover-wick-150x150.jpg",
      title: "Test News",
      publishedAt: "2019-12-06T13:30:59Z",
      description: "This is a news test with testing library",
      author: null
    };
    // act
    const component = render(<NewsItem article={data} />);
    // assert
    expect(component.getByTestId("article-author").textContent).toBe("None");
  });
});
