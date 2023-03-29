import Link from "next/link";

const Country = (props: {
  name: string;
  flag: string;
  countryCode: string;
}) => {
  const { name, flag, countryCode } = props;
  const lowercaseCountryCode = countryCode.toLowerCase();

  return (
    <Link href={`/country/${lowercaseCountryCode}`}>
      <div className="w-fit py-[0.5rem] font-medium hover:text-neutral-600 transition-colors ease-in duration-75">
        {flag} <span className="pl-[0.5rem]">{name}</span>
      </div>
    </Link>
  );
};

export default Country;
