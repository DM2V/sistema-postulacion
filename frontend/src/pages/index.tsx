import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import HomePage from '../pages/Public/Home';
import Campus from './Public/Campus';
import Schedule from "./Public/Schedule";
import Offer from "./Public/Offer";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Offer/>
      <HomePage />
      <Schedule />
      <Campus />
      <Footer />
    </div>
  );
}
