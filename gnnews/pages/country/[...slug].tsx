import Container from "@/components/Container/Container";
import Feed, { Article } from "@/components/Feed/Feed";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SideMenu from "@/components/SideMenu/SideMenu";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

export default function Home(props: {
  articles: Article[];
  slug: string;
  locale: string;
}) {
  const { articles, slug, locale } = props;
  const countryName = new Intl.DisplayNames([locale], {
    type: "region",
  }).of(slug.toUpperCase());

  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>
          {countryName} {t("latestNews")}
        </title>
        <meta
          property="og:title"
          content={`${countryName} ${t("latestNews")}`}
        />
        <meta
          property="og:description"
          content={`${t("metaDescriptionSlug", { countryName })}`}
        />
      </Head>
      <div className="bg-neutral-100  text-white flex flex-col bg justify-between">
        <Header />
        <Container className="my-[2rem] flex gap-[2rem]">
          <SideMenu />
          <Feed articles={articles} />
        </Container>
        <Footer />
      </div>
    </>
  );
}

export const getServerSideProps = async ({
  locale,
  query,
}: {
  locale: string;
  query: { slug: string[] };
}) => {
  const apiUrl = process.env.API_URL;
  const apiKey = process.env.API_KEY;

  const slug = query.slug[0];
  const res = await fetch(`${apiUrl}${slug}&apiKey=${apiKey}`);
  const articles = await res.json().then((data) => data.articles);

  if (articles.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "footer"])),
      articles,
      slug,
      locale,
    },
  };
};
