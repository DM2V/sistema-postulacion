import Navbar from "@/components/Layout/Navbar";
import HomePage from "../pages/Public/Home";
import Campus from "./Public/Campus";
import Signup from "./Public/Signup";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Signup />
      <HomePage />
      <Campus />
    </div>
  );
}
