// import '../styles/global.css';

import Footer from "@/components/Layout/Footer";
import LayoutWithNavbarPublic from "@/components/Layout/LayoutWithNavbarPublic";
import HomePage from "./public/home";

export default function Home() {
  return (
    <LayoutWithNavbarPublic>
      <HomePage />
      <Footer />
    </LayoutWithNavbarPublic>

  )
}
