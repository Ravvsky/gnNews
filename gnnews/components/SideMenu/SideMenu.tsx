import { useState, useEffect } from "react";
import { countries } from "countries-list";
import Country from "../Country/Country";
import { useTranslation } from "next-i18next";

type CountryProps = {
  name: string;
  flag: string;
  countryCode: string;
};
type Country = {};
const SideMenu = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation("common");

  const { language: currentLanguage } = i18n;
  const [countriesList, setCountriesList] = useState<CountryProps[]>([]);
  useEffect(() => {
    const languageNames = new Intl.DisplayNames([currentLanguage], {
      type: "region",
    });

    const modifiedCountries = Object.entries(countries).map(
      ([countryCode, country]) => {
        const translatedCountryName = languageNames.of(countryCode);
        return {
          name: translatedCountryName,
          flag: country.emoji,
          countryCode: countryCode,
        } as CountryProps;
      }
    );

    setCountriesList(modifiedCountries);
  }, [currentLanguage]);

  return (
    <div className="hidden md:block">
      <div className=" bg-red-500 w-fit  rounded-[1rem] font-medium  flex flex-col">
        <div>{t("chooseCountry")}</div>

        <div className="flex flex-col max-h-[50rem] w-fit overflow-auto bg-green-500">
          {countriesList.map((country, index) => (
            <Country
              key={index}
              name={country.name}
              flag={country.flag}
              countryCode={country.countryCode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
