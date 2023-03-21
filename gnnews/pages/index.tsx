import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <>
      <div className="bg-neutral-100 h-screen text-white flex flex-col bg justify-between">
        <Header />
        <Footer />
      </div>
    </>
  );
}
