import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import HomePage from '../pages/Public/Home';
import Campus from './Public/Campus';

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HomePage />
      <Campus />
      <Footer />
    </div>
  );
}
