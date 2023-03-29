import Link from "next/link";
import Button from "../Button/Button";
import Container from "../Container/Container";
import ViewSwitcher from "../ViewSwitcher/ViewSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";

const Header = ({ onClick = () => {} }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  const [isModalShown, setIsModalShown] = useState(false);

  onClick = () => {
    setIsModalShown(true);
  };

  return (
    <Container
      className={`${
        visible ? "top-0" : "-top-full"
      } transition-all duration-300 py-[2rem] z-[2] bg-white px-[3rem]  items-center fixed left-0 right-0  text-black shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-b-[1rem]`}
    >
      <div className="flex gap-[2rem] items-center  justify-between">
        <Link href="/" data-testid="logo">
          <div className="text-[3rem] font-bold font-roboto">gnNews</div>
        </Link>
        <div className="flex gap-[2rem]">
          <ViewSwitcher />
          <LanguageSwitcher />
          <Button type={"button"} onClick={onClick}>
            Pop up
          </Button>
          {isModalShown && (
            <Modal
              onClose={() => {
                setIsModalShown(false);
              }}
              title={"Hard and enjoyable things"}
            >
              <h2 className="text-[2rem] font-medium">Hard things</h2>
              <p className="py-[2rem]">
                Hardes thing for me was a whole testing process. I realativly
                fast understand simples principles of testing like checking if
                something just exists on screen but things got complicated when
                I had to use mocks to simulate behavior of different functions.
              </p>
              <p className="pb-[2rem]">
                Hardest thing to mock was mocking things connected with
                translation package as i couldn&apos;t find any documentation
                about mocking nexti18next
              </p>
              <p className="pb-[2rem]">
                I had some strugle with Article component. I wasn&apos;t sure
                how I should organize my code to make it easy to read but also
                to not making many of child components. In my opinion actual
                version is readable but I&apos;m sure there is still space for
                improvement.
              </p>
              <h2 className="text-[2rem] font-medium">Enjoyble things</h2>
              <p className="py-[2rem]">
                I really enjoyed translation process. I got opportunity to learn
                a new package. I got some problems with configuration but when I
                finally figured it out it was satisfing to add next strings to
                see how my app is getting more interactive.
              </p>
              <p className="">
                I also liked a working with Redux. I used to use Redux earlier
                but there were a few things I had to remember. Most enjoyable
                time was a begining of development because no matter what I did
                it started to look better.
              </p>
            </Modal>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Header;
