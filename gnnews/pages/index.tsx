import Container from "@/components/Container/Container";
import Feed, { Article } from "@/components/Feed/Feed";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SideMenu from "@/components/SideMenu/SideMenu";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
export default function Home(props: { articles: Article[] }) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("allArticles")}</title>
        <meta property="og:title" content={`${t("allArticles")}`} />
        <meta
          property="og:description"
          content={`${t("metaDescriptionIndex")}`}
        />
      </Head>
      <div className="bg-neutral-100  text-white flex flex-col bg justify-between">
        <Header />
        <Container className="my-[2rem] flex gap-[2rem] pt-[8.5rem]">
          <SideMenu />
          <Feed articles={props.articles} />
        </Container>
        <Footer />
      </div>
    </>
  );
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const apiUrl = process.env.API_URL;
  const apiKey = process.env.API_KEY;

  const res = await fetch(`${apiUrl}us&apiKey=${apiKey}`);
  const articles = await res.json().then((data) => data.articles);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "footer"])),
      articles,
    },
  };
};
