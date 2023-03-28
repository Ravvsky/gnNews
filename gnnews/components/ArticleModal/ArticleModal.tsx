import Link from "next/link";
import Modal from "../Modal/Modal";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "next-i18next";

interface ArticleModalProps {
  title: string;
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
      <div className="pt-[2rem]">
        {t("readMore")} <Link href={sourceUrl}>{sourceName}</Link>
      </div>
    </Modal>
  );
};

export default ArticleModal;
