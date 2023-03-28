const formatDateString = (publishedAt: string): string => {
  const date = new Date(publishedAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const localDateString = date.toLocaleDateString("pl-PL", options);
  const dateParts = localDateString.split(".");
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
};

export default formatDateString;
