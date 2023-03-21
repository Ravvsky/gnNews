import Button from "../Button/Button";
import Container from "../Container/Container";
import ViewSwitch from "../ViewSwitch/ViewSwitch";

const Header = () => {
  const clickHandler = () => {};
  return (
    <Container>
      <div className="py-[2rem] px-[3rem] flex justify-between items-center text-black shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-b-[1rem]">
        <div className="text-[3rem] font-bold font-roboto">gnNews</div>
        <div className="flex gap-[2rem] items-center">
          <ViewSwitch />
          <Button type={"button"} onClick={clickHandler}>
            Pop up
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Header;
