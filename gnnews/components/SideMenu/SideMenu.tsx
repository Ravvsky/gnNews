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

  const { language: currentLanguage } = i18n || { language: "en" }; // add default value for i18n object

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
    <div className="hidden md:block sticky top-[2rem]  h-full">
      <div className="bg-white text-black p-[2rem] w-fit  rounded-[1rem] font-medium  flex flex-col shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px]">
        <div className="mb-[1rem] pb-[1rem] text-[2rem] border-b-[0.1rem] border-spacing-8 border-gray-500">
          {t("chooseCountry")}
        </div>

        <div className="flex flex-col max-h-[85vh] w-fit overflow-auto text-black ">
          {countriesList.map((country, index) => (
            <Country
              key={index}
              name={country.name}
              flag={country.flag}
              countryCode={country.countryCode}
              data-testid="country"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
