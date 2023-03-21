import {
  ReactNode,
  FunctionComponent,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";

const Container = (props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal;
}) => {
  return (
    <div className=" mx-[2rem] sm:mx-[5rem] md:mx-[7rem] lg:mx-[10rem] xl:mx-[12rem] 2xl:mx-[22rem]">
      {props.children}
    </div>
  );
};

export default Container;
