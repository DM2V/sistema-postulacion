import Navbar from "@/components/Layout/Navbar";
import HomePage from '../pages/Public/Home';
import Campus from './Public/Campus';
import Schedule from "./Public/Schedule";
import Offer from "./Public/Offer";
import Signup from "./Public/Signup";
import PersonalData from "./Private/PersonalData";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <PersonalData/>
      <Campus />
      <Signup />
      <HomePage />
      <Schedule />
      <Offer />
    </div>
  );
}
