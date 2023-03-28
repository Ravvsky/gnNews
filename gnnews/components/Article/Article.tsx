import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import placeholder from "../../assets/images/article_placeholder.png";
import formatDateString from "@/utils/formatDateString";
import ArticleModal from "../ArticleModal/ArticleModal";
import { useTranslation } from "next-i18next";

interface ArticleProps {
  variant: "list" | "card";
  imageUrl: string;
  title: string;
  description: string;
  content: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
}
const Article = ({
  variant,
  imageUrl,
  title,
  description,
  content,
  sourceName,
  sourceUrl,
  publishedAt,
}: ArticleProps) => {
  const { t } = useTranslation("common");

  const formattedDate = formatDateString(publishedAt);
  const [isModalShown, setIsModalShown] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imageErrorHandler = () => {
    setHasError(true);
  };
  const renderModal = () => {
    return (
      <ArticleModal
        title={title}
        imageUrl={imageUrl}
        description={description}
        content={content}
        sourceUrl={sourceUrl}
        sourceName={sourceName}
        onClose={() => {
          setIsModalShown(false);
        }}
      />
    );
  };

  const renderContent = () => {
    switch (variant) {
      case "list":
        return (
          <div
            onClick={() => {
              setIsModalShown(true);
            }}
            data-testid="article-list-item"
            className={`text-black flex flex-col p-[0.7rem] gap-[1rem] justify-between rounded-[1.4rem]  hover:cursor-pointer shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px]`}
          >
            <span>{title}</span>
            <div className="flex justify-between">
              <span>
                {t("source")} <Link href={sourceUrl}>{sourceName}</Link>
              </span>
              <span>{formattedDate}</span>
            </div>
            {isModalShown && renderModal()}
          </div>
        );
      case "card":
        return (
          <div
            className="text-black flex flex-col p-[0.7rem] h-full rounded-[1.4rem] hover:cursor-pointer shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] group"
            onClick={() => {
              setIsModalShown(true);
            }}
          >
            <div className="overflow-hidden rounded-[0.7rem]">
              {imageUrl && !hasError && (
                <Image
                  src={imageUrl}
                  alt={"Image for article"}
                  width="900"
                  height="0"
                  className="h-[25rem] object-cover group-hover:scale-[1.2] transition-transform ease-in-out duration-[0.2] "
                  onError={imageErrorHandler}
                />
              )}
              {(hasError || !imageUrl) && (
                <Image
                  src={placeholder}
                  alt={"Placeholder image for article"}
                  width="900"
                  height="0"
                  className="h-[25rem] object-cover group-hover:scale-[1.2] transition-transform ease-in-out duration-[0.2] "
                />
              )}
            </div>
            <h3 className="text-[1.8rem] text-medium pt-[1rem]">{title}</h3>
            <span className="text-[1.2rem]">{description}</span>
            <div className="flex justify-between text-[1rem] pt-[1rem] mt-auto mb-[1rem]">
              <div>
                {t("source")} <Link href={sourceUrl}> {sourceName}</Link>
              </div>
              <span>{formattedDate}</span>
            </div>
            {isModalShown && renderModal()}
          </div>
        );
    }
  };

  return <>{renderContent()}</>;
};

export default Article;
