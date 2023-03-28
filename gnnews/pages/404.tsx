import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Link from "next/link";

const Page404 = () => {
  return (
    <div className="bg-neutral-100 h-screen text-white flex flex-col bg justify-between">
      <Header />
      <Container className="my-[2rem] flex flex-col gap-[2rem] justify-center items-center ">
        <div className="text-gray-900 text-[20rem] font-roboto font-bold text-center">
          404
        </div>
        <Link href="/">
          <Button
            type="button"
            className="w-max p-[2rem] bg-lime-300 text-neutral-800	 hover:bg-lime-600 hover:text-neutral-50"
          >
            Back to homepage
          </Button>
        </Link>
      </Container>
      <Footer />
    </div>
  );
};

export default Page404;
