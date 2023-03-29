import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useTranslation } from "next-i18next";

const LanguageSwitcher: React.FC<{
  onChange?: (locale: string) => unknown;
}> = ({ onChange }) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const locales = (router.locales ?? [router.locale]).filter(
    (locale) => locale !== undefined
  ) as string[];

  function getLanguageNames(languageCodes: string[]) {
    const languageNames: Record<string, string> = {};

    languageCodes.forEach((language) => {
      const displayNames = new Intl.DisplayNames(language, {
        type: "language",
      });
      const fullName = displayNames.of(language) as string;
      languageNames[language] = fullName;
    });

    return languageNames;
  }

  const languageNames = getLanguageNames(locales);

  const [value, setValue] = useState<{ value: string; label: string }>({
    value: router.locale || "en",
    label: capitalize(languageNames[router.locale || "en"]),
  });

  const switchToLocale = useCallback(
    (locale: string) => {
      const path = router.asPath;
      return router.push(path, path, { locale });
    },
    [router]
  );

  const languageChanged = useCallback(
    async (option: { value: string }) => {
      const locale = option.value;

      setValue((prevState) => ({
        ...prevState,
        value: locale,
        label: capitalize(languageNames[locale] || locale),
      }));

      if (onChange) {
        onChange(locale);
      }

      await switchToLocale(locale);
    },
    [switchToLocale, onChange, languageNames]
  );

  return (
    <select
      data-testid="language-switcher"
      aria-label="language-select"
      value={value.value}
      onChange={(event) => languageChanged(event.target.selectedOptions[0])}
      className="pr-[2rem] rounded-[1rem] focus-within:outline-none"
    >
      {locales.map((locale) => {
        const label = capitalize(languageNames[locale] ?? locale);
        return (
          <option key={locale} value={locale} label={label}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

function capitalize(lang: string) {
  return lang.slice(0, 1).toUpperCase() + lang.slice(1);
}

export default LanguageSwitcher;
