import Link from "next/link";
import Modal from "../Modal/Modal";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "next-i18next";

interface ArticleModalProps {
  title: string;
  author: string;
  imageUrl?: string;
  description: string;
  content: string;
  sourceUrl: string;
  sourceName: string;
  onClose: () => void;
}

const ArticleModal = (props: ArticleModalProps) => {
  const {
    title,
    author,
    imageUrl,
    description,
    content,
    sourceUrl,
    sourceName,
    onClose,
  } = props;

  const [hasError, setHasError] = useState(false);
  const { t } = useTranslation("common");

  return (
    <Modal
      title={title}
      onClose={() => {
        onClose();
      }}
    >
      {imageUrl && !hasError && (
        <Image
          src={imageUrl}
          alt="Article image"
          width="900"
          height="1009"
          className="rounded-[1rem] pb-[2rem] w-full"
          onError={() => {
            setHasError(true);
          }}
        />
      )}

      <div>{description}</div>

      <div>{content}</div>
      <div
        data-testid="article-modal"
        className="pt-[2rem] flex justify-between"
      >
        <div>
          {t("readMore")}{" "}
          <Link
            href={sourceUrl}
            className="hover:text-green-900 transition-colors ease-in duration-75"
          >
            {sourceName}
          </Link>
        </div>
        {t("authors")}
        {author}
      </div>
    </Modal>
  );
};

export default ArticleModal;
