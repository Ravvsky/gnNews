import { useEffect, useState } from "react";
import Container from "../Container/Container";
import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

const Footer = () => {
  const { t } = useTranslation("footer");
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("pl-pl", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  useEffect(() => {
    setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("pl-pl", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);
  }, []);

  const visibleArticles = useSelector(
    (state: { visibleArticles: number }) => state.visibleArticles
  );
  return (
    <footer className="bg-lime-300 min-h-[20rem] flex">
      <Container className="flex justify-between items-center text-black w-full">
        <div>
          {t("articlesOnHomePage")} {`${visibleArticles}`}
        </div>

        <div>{`${t("currentTime")} ${time}`}</div>
      </Container>
    </footer>
  );
};

export default Footer;
