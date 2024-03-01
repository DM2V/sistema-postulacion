import React from "react";
import Navbar from "../Navbar/Navbar";

function LayoutWithNavbar({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar labels={[]} />
      <div>{children}</div>
    </main>
  );
}

export default LayoutWithNavbar;
