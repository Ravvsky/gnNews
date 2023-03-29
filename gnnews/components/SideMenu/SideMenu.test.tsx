import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SideMenu from "./SideMenu";

jest.mock("next-i18next", () => ({
  appWithTranslation: jest.fn((SideMenu) => SideMenu),
  useTranslation: () => ({ t: tMock }),
  i18n: {
    language: "en",
  },
}));

const tMock = jest.fn((key) => {
  switch (key) {
    case "chooseCountry":
      return "Choose country";
    default:
      return key;
  }
});

describe("SideMenu", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render Sidemenu in english", () => {
    const { getByText } = render(<SideMenu />);

    expect(getByText(`Choose country`)).toBeInTheDocument();
  });
  it("should render Sidemenu in polish", () => {
    tMock.mockImplementation((key) => {
      switch (key) {
        case "chooseCountry":
          return "Wybierz kraj";
        default:
          return key;
      }
    });
    const { getByText } = render(<SideMenu />);

    expect(getByText(`Wybierz kraj`)).toBeInTheDocument();
  });
});
