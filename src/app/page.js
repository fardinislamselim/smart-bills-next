import Image from "next/image";
import Banner from "./components/Bnner";
import CategoryCards from "./components/CategoryCards";
import LatestBills from "./components/LatestBills";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <CategoryCards />
      <LatestBills />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
