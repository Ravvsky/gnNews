import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Article from "../Article/Article";
import { setVisibleArticles } from "@/store/reducers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export interface Article {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

const Feed = (props: { articles: Article[] }) => {
  const dispatch = useDispatch();
  const { articles } = props;
  const [tallestArticleListItem, setTallestArticleListItem] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const listref = useRef<HTMLDivElement>(null);
  const view = useSelector((state: { view: string }) => state.view);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    dispatch(setVisibleArticles(articles.length));
  }, [articles.length, dispatch]);

  useEffect(() => {
    if (view === "dashboard") return;
    const list = listref.current?.children;

    let tallest = 0;

    if (list) {
      for (let i = 0; i < list.length; i++) {
        const height = (list[i] as HTMLDivElement).offsetHeight;

        if (height > tallest) {
          tallest = height;
        }
      }
    }

    setTallestArticleListItem(tallest);
  }, [articles, view]);

  useEffect(() => {
    if (view === "dashboard") return;
    const articleListItems = listref.current?.children;
    if (articleListItems) {
      for (let i = 0; i < articleListItems.length; i++) {
        (
          articleListItems[i] as HTMLElement
        ).style.height = `${tallestArticleListItem}px`;
      }
      if (view !== "dashboard") {
        for (let i = 0; i < articleListItems.length; i++) {
          (articleListItems[i] as HTMLElement).style.height = `auto`;
        }
      }
    }
  }, [tallestArticleListItem, view]);

  const ArticlesCardVariant = articles?.map((article, index) => {
    return (
      <Article
        key={index}
        variant="card"
        author={article.author}
        title={article.title}
        imageUrl={article.urlToImage}
        description={article.description}
        content={article.content}
        sourceName={article.source.name}
        sourceUrl={article.url}
        publishedAt={article.publishedAt}
      />
    );
  });
  const ArticlesListVariant = articles?.map((article, index) => {
    return (
      <Article
        key={index}
        variant="list"
        author={article.author}
        title={article.title}
        content={article.content}
        sourceName={article.source.name}
        sourceUrl={article.url}
        publishedAt={article.publishedAt}
        description={article.description}
        imageUrl={article.urlToImage}
      />
    );
  });

  const cardView = (
    <section
      data-testid="feed-card"
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-auto-rows gap-[1rem] w-full content-baseline"
    >
      {isLoading
        ? Array.from({ length: 9 }).map((_, index) => (
            <div key={index}>
              <Skeleton height={200} />
              <Skeleton count={3} />
            </div>
          ))
        : ArticlesCardVariant}
    </section>
  );
  const listView = (
    <section
      data-testid="feed-list"
      className={`flex flex-col w-full gap-[2rem]`}
      ref={listref}
    >
      {isLoading
        ? Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} height={100} />
          ))
        : ArticlesListVariant}
    </section>
  );

  return (
    <>
      {view === "dashboard" ? cardView : view === "view_list" ? listView : null}
    </>
  );
};

export default Feed;
