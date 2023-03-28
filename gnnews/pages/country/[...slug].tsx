import Container from "@/components/Container/Container";
import Feed, { Article } from "@/components/Feed/Feed";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SideMenu from "@/components/SideMenu/SideMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home(props: { articles: Article[] }) {
  return (
    <>
      <div className="bg-neutral-100  text-white flex flex-col bg justify-between">
        <Header />
        <Container className="my-[2rem] flex gap-[2rem]">
          <SideMenu />
          <Feed articles={props.articles} />
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
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "footer"])),
      articles,
    },
  };
};
