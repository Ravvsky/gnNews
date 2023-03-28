import Link from "next/link";

const Country = (props: {
  name: string;
  flag: string;
  countryCode: string;
}) => {
  const { name, flag, countryCode } = props;
  const lowercaseCountryCode = countryCode.toLowerCase();

  return (
    <Link href={`country/${lowercaseCountryCode}`}>
      <div className="w-fit">
        {flag} {name}
      </div>
    </Link>
  );
};

export default Country;
