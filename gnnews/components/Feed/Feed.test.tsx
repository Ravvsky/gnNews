import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Selector, useSelector, useDispatch } from "react-redux";
import Feed from "./Feed";
import { setView } from "@/store/reducers";
import "@testing-library/jest-dom";

jest.mock("react-redux");

describe("Feed", () => {
  const dispatch = jest.fn();

  const useSelectorMock = useSelector as unknown as jest.MockedFunction<
    Selector<{ view: string }, string>
  >;
  const useDispatchMock = useDispatch as jest.MockedFunction<
    typeof useDispatch
  >;
  useDispatchMock.mockReturnValue(dispatch);
  beforeEach(() => {
    useSelectorMock.mockReturnValue("dashboard");
    useDispatchMock.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the feed list", () => {
    useSelectorMock.mockReturnValue("view_list");

    const { getByTestId } = render(
      <Feed
        articles={[
          {
            author: "author",
            content: "string",
            description: "string",
            publishedAt: "string",
            source: {
              id: "string",
              name: "string",
            },
            title: "string",
            url: "string",
            urlToImage: "string",
          },
        ]}
      />
    );
    const feedList = getByTestId("feed-list");

    expect(feedList).toBeInTheDocument();
  });

  it("should render the feed list with props", () => {
    useSelectorMock.mockReturnValue("view_list");

    const articles = [
      {
        author: "author",
        content: "content",
        description: "description",
        publishedAt: "2023-03-28T09:45:00Z",
        source: {
          id: "string",
          name: "source Name",
        },
        title: "title",
        url: "string",
        urlToImage: "/string",
      },
    ];

    const { getByTestId, getByText } = render(<Feed articles={articles} />);
    const feedList = getByTestId("feed-list");
    const sourceNameLink = getByText(articles[0].source.name);
    expect(feedList).toBeInTheDocument();
    expect(feedList).toHaveTextContent(articles[0].title);
    expect(feedList).toHaveTextContent(articles[0].source.name);
    expect(sourceNameLink).toHaveAttribute("href", articles[0].url);
  });

  it("should render the feed cards", () => {
    useSelectorMock.mockReturnValue("dashboard");

    const { getByTestId } = render(
      <Feed
        articles={[
          {
            author: "author",
            content: "string",
            description: "string",
            publishedAt: "2023-03-28T09:45:00Z",
            source: {
              id: "string",
              name: "string",
            },
            title: "string",
            url: "string",
            urlToImage: "/string",
          },
        ]}
      />
    );
    const feedCard = getByTestId("feed-card");

    expect(feedCard).toBeInTheDocument();
  });

  it("should render the feed cards with props", () => {
    useSelectorMock.mockReturnValue("dashboard");

    const articles = [
      {
        author: "author",
        content: "content",
        description: "description",
        publishedAt: "2023-03-28T09:45:00Z",
        source: {
          id: "string",
          name: "source Name",
        },
        title: "title",
        url: "string",
        urlToImage: "/string",
      },
    ];

    const { getByTestId, getByText } = render(<Feed articles={articles} />);
    const feedCard = getByTestId("feed-card");
    const sourceNameLink = getByText(articles[0].source.name);
    expect(feedCard).toBeInTheDocument();
    expect(feedCard).toHaveTextContent(articles[0].title);
    expect(feedCard).toHaveTextContent(articles[0].description);
    expect(feedCard).toHaveTextContent(articles[0].source.name);
    expect(sourceNameLink).toHaveAttribute("href", articles[0].url);
  });
});
