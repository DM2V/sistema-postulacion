import Navbar from "@/components/Layout/Navbar";
import HomePage from '../pages/Public/Home';
import Campus from './Public/Campus';
import Schedule from "./Public/Schedule";
import Offer from "./Public/Offer";
import Signup from "./Public/Signup";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Signup />
      <HomePage />
      <Schedule />
      <Campus />
    </div>
  );
}
